using System.ComponentModel;

namespace BookAPIWithEF.Models
{
    public class AddQuoteModel
    {
        public string? QuoteTitle { get; set; }
        [DefaultValue(false)]
        public bool Liked { get; set; }
    }
}
