using BookAPIWithEF.EfCore;
using BookAPIWithEF.Models;


namespace BookAPIWithEF.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly BookAppDbContext _db;

        public BookRepository(BookAppDbContext db)
        {
            _db = db;
        }
        public bool CreateBook(Book Book)
        {
            _db.Books.Add(Book);
            return Save();
        }

        public bool DeleteBook(Book Book)
        {
            _db.Books.Remove(Book);
            return Save();
        }

        public IQueryable<Book> GetBooks()
        {
            return _db.Books.AsQueryable();

        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0 ? true : false;
        }

        public bool UpdateBook(Book Book)
        {
            _db.Books.Update(Book);
            return Save();
        }

        public bool BookExists(int id)
        {
            return _db.Books.Any(x => x.Id == id);
        }

        public Book GetBook(int id)
        {
            return _db.Books.FirstOrDefault(x => x.Id == id);
        }

        public bool BookExists(string title)
        {
            bool value = _db.Books.Any(y => y.Title.ToLower().Trim() == title.ToLower().Trim());
            return value;
        }
    }
}