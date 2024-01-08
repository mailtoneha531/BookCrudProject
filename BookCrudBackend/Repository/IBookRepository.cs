using BookAPIWithEF.Models;

namespace BookAPIWithEF.Repository
{
    public interface IBookRepository
    {
        IQueryable<Book> GetBooks();

        Book GetBook(int id);     

        bool BookExists(int id);

        bool BookExists(string title);

        bool CreateBook(Book book);

        bool UpdateBook(Book book);

        bool DeleteBook(Book book);

        bool Save();
    }
}
