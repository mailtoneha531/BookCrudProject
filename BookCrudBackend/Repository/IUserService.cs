using BookAPIWithEF.Models;

namespace BookAPIWithEF.Repository
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task<User> Register(User user);
        IQueryable<User> GetUsers();
        User GetUser(string userName);
    }
}
