using System.ComponentModel.DataAnnotations;

namespace ApiUrnaEletronica.Models
{
    public class Vote
    {
        public int Id { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public Candidate? Candidate { get; set; }
    }
}
