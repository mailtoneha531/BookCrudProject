using BookAPIWithEF.Models;
using BookAPIWithEF.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
namespace BookAPIWithEF.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly JwtSettings _jwtSettings;

    public UserController(IUserService userService, IOptions<JwtSettings> jwtSettings)
    {
            _userService = userService;
            _jwtSettings = jwtSettings.Value;
    }

    [HttpPost("register")]
     public async Task<IActionResult> Register([FromBody] User User)
     {
         if (!ModelState.IsValid)
         {
             return BadRequest(ModelState);
         }

         var user = await _userService.Register(User);
         return Ok(new { user.Id, user.UserName });
     }

        [HttpGet]
        public IQueryable Get()
        {
            return _userService.GetUsers();
        }
        


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginModel model)
    {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _userService.Authenticate(model.UserName, model.Password);
            if (user == null)
            {
                return Unauthorized();
            }
            var token = GenerateJwtToken(model.UserName);
            return Ok(new { token });     
    }

    private string GenerateJwtToken(string username)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes("TestSecretKeyForTestingCRUDOperation");
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username)
            }),
            Expires = DateTime.UtcNow.AddMinutes(60),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    }
}
