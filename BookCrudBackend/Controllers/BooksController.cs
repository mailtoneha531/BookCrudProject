using Microsoft.AspNetCore.Mvc;
using BookAPIWithEF.Repository;
using BookAPIWithEF.Models;

namespace BookAPIWithEF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _BookRepo;
        public BooksController(IBookRepository BookRepo)
        {
            _BookRepo = BookRepo;
        }

        /// <summary>
        /// Get list of all Books
        /// </summary>
        [HttpGet]
        public IQueryable Get()
        {
            return _BookRepo.GetBooks();
        }


        [HttpGet("{BookId:int}")]
        public async Task<IActionResult> GetBook(int BookId)
        {
            Book book = _BookRepo.GetBook(BookId);
            return Ok(book);
        }

        /// <summary>
        /// Create a new Book
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Book Book)
        {
            if (Book == null)
                return BadRequest(ModelState);
            if (_BookRepo.BookExists(Book.Title))
            {
                ModelState.AddModelError("", "Book already Exist");
                return StatusCode(500, ModelState);
            }

            if (!_BookRepo.CreateBook(Book))
            {
                ModelState.AddModelError("", $"Something went wrong while saving Book record of {Book.Title}");
                return StatusCode(500, ModelState);
            }

            return Ok(Book);

        }

        /// <summary>
        /// Update a Book
        /// </summary>
        /// <return></return>
        [HttpPut("{BookId:int}")]
        public IActionResult Update(int BookId, [FromBody] Book Book)
        {
            if (Book == null || BookId != Book.Id)
                return BadRequest(ModelState);

            if (!_BookRepo.UpdateBook(Book))
            {
                ModelState.AddModelError("", $"Something went wrong while updating Book : {Book.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }


        /// <summary>
        /// Update a Book
        /// </summary>
        /// <return></return>

        [HttpDelete("{BookId:int}")]
        public IActionResult Delete(int BookId)
        {
            if (!_BookRepo.BookExists(BookId))
            {
                return NotFound();
            }

            var Bookobj = _BookRepo.GetBook(BookId);

            if (!_BookRepo.DeleteBook(Bookobj))
            {
                ModelState.AddModelError("", $"Something went wrong while deleting Book : {Bookobj.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

    }
}