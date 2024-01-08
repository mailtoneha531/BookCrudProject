using BookAPIWithEF.EfCore;
using BookAPIWithEF.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace BookAPIWithEF.Repository
{
    public class QuoteService : IQuoteService
    {
        private readonly BookAppDbContext _db;

        public QuoteService(BookAppDbContext db)
        {
            _db = db;
        }

        public bool CreateQuote(Quote quote)
        {
            _db.Quotes.Add(quote);
            return Save();
        }

        public bool UpdateQuote(Quote quote)
        {
            _db.Quotes.Update(quote);
            return Save();
        }

        public IQueryable GetQuotes(int userId)
        {
            //return _db.Books.FirstOrDefault(x => x.Id == id);

            //Using LINQ Query Syntax:
            //var quotes = (from q in _db.Quotes
            //                where q.UserId == userId
            //                select q).ToList();
            //Using LINQ Method Syntax:
            var quotes = _db.Quotes
            .Where(q => q.UserId == userId);
            return quotes;
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0 ? true : false;
        }
    }
}
