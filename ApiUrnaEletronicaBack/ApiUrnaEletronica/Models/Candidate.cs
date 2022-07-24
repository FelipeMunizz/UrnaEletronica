using System.ComponentModel.DataAnnotations;

namespace ApiUrnaEletronica.Models
{
    public class Candidate
    {
        [Required]
        [Key]
        public int Id { get; set; }

        [Required]
        public string? FullName { get; set; }

        [Required]
        public string? ViceCandidateName { get; set; }

        [Required]
        public int? ElectoralNumber { get; set; }

        [Required]
        public string? Party { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public List<Vote>? Votes { get; set; }
    }
}
