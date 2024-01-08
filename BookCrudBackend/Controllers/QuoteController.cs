using BookAPIWithEF.Models;
using BookAPIWithEF.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;

namespace BookAPIWithEF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {

        private readonly IQuoteService _quoteService;
        private readonly IUserService _userService;

        public QuoteController(IQuoteService quoteService, IUserService userService)
        {
            _quoteService = quoteService;
            _userService = userService;
        }

        [HttpGet]
        public IQueryable GetQuotes(int UserId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var SecretKey = "TestSecretKeyForTestingCRUDOperation";
            var key = Encoding.ASCII.GetBytes(SecretKey);
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);
            Console.WriteLine(token);
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;

            Console.WriteLine(jwtToken);

            var userName = jwtToken.Claims.First(x => x.Type == "unique_name").Value;

            User user = _userService.GetUser(userName);
            var quotes = _quoteService.GetQuotes(user.Id);

            return quotes;
        }

        [HttpPost]
        public async Task<IActionResult> CreateQuote([FromBody] AddQuoteModel addQuoteModel)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var SecretKey = "TestSecretKeyForTestingCRUDOperation";
            var key = Encoding.ASCII.GetBytes(SecretKey);
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", string.Empty);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;

            Console.WriteLine(jwtToken);

            var userName = jwtToken.Claims.First(x => x.Type == "unique_name").Value;

            User user = _userService.GetUser(userName);

            if (addQuoteModel == null)
                return BadRequest(ModelState);

            Quote qouteObj = new Quote();
            qouteObj.QuoteTitle = addQuoteModel.QuoteTitle;
            qouteObj.Liked = addQuoteModel.Liked;
            qouteObj.UserId = user.Id;

            if (!_quoteService.CreateQuote(qouteObj))
            {
                ModelState.AddModelError("", $"Something went wrong while saving Book record of {addQuoteModel.QuoteTitle}");
                return StatusCode(500, ModelState);
            }
            return Ok(qouteObj);
        }

        /// Update a Book
        [HttpPut("{QuoteId:int}")]
        public IActionResult Update(int QuoteId, [FromBody] Quote quote)
        {
            if (quote == null || QuoteId != quote.Id)
                return BadRequest(ModelState);

            if (!_quoteService.UpdateQuote(quote))
            {
                ModelState.AddModelError("", $"Something went wrong while updating Book : {quote.QuoteTitle}");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }
    }
}
