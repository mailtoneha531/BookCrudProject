using System.ComponentModel;

namespace BookAPIWithEF.Models
{
    public class Quote
    {
        public int Id { get; set; }
        public string? QuoteTitle { get; set; }
        [DefaultValue(false)]
        public bool Liked { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
