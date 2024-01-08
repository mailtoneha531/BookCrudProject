using System.ComponentModel.DataAnnotations;

namespace BookAPIWithEF.Models
{
    public class Book
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }
        public DateTime PublicationDate { get; set; }
    }
}
