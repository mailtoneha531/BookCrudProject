namespace BookAPIWithEF.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        // Other user properties as needed
        public List<Quote> Quotes { get; set; } = new List<Quote>();
    }
}
