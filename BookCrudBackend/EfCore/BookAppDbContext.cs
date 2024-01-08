using Microsoft.EntityFrameworkCore;

using BookAPIWithEF.Models;

namespace BookAPIWithEF.EfCore
{
    public class BookAppDbContext : DbContext
    {
        public BookAppDbContext(DbContextOptions<BookAppDbContext> options) : base(options)
        {

        }
        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Quote> Quotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the one-to-many relationship between User and Comment
            modelBuilder.Entity<Quote>()
                .HasOne(c => c.User)
                .WithMany(u => u.Quotes)
                .HasForeignKey(c => c.UserId);
            base.OnModelCreating(modelBuilder);
        }
    }
}
