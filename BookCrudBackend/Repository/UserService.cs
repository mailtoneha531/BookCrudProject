using BookAPIWithEF.EfCore;
using BookAPIWithEF.Models;
using Microsoft.EntityFrameworkCore;

namespace BookAPIWithEF.Repository
{
    public class UserService : IUserService
    {
        private readonly BookAppDbContext _dbContext;

        public UserService(BookAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public IQueryable<User> GetUsers()
        {
            return _dbContext.Users.AsQueryable();
        }

        public async Task<User> Authenticate(string username, string password)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.UserName == username && u.Password == password);
            return user;
        }

        public User GetUser(string userName)
        {
            return _dbContext.Users.FirstOrDefault(x => x.UserName == userName);
        }

        public async Task<User> Register(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return user;
        }
    }
}
