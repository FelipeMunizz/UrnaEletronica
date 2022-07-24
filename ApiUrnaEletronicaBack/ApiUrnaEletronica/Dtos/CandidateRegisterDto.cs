using ApiUrnaEletronica.Models;

namespace UrnaBackend.Dtos
{
    public class CandidateRegisterDto
    {
        public int Id { get; set; }

        public string? FullName { get; set; }

        public string? ViceCandidateName { get; set; }

        public DateTime CreatedAt { get; set; }

        public int? ElectoralNumber { get; set; }

        public string? Party { get; set; }

        public List<Vote>? Votes { get; set; }
    }
}
