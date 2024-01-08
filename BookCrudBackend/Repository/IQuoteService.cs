using BookAPIWithEF.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookAPIWithEF.Repository
{
    public interface IQuoteService
    {
       public IQueryable GetQuotes(int userId);
       public bool CreateQuote(Quote quote);
       public bool UpdateQuote(Quote quote);
    }
}
