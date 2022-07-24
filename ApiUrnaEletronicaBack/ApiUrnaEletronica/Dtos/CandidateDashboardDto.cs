namespace UrnaBackend.Dtos
{
    public class CandidateDashboardDto
    {
        public int Id { get; set; }

        public string? FullName { get; set; }

        public string? ViceCandidateName { get; set; }

        public DateTime CreatedAt { get; set; }

        public int? ElectoralNumber { get; set; }

        public string? Party { get; set; }

        public int? VoteCount { get; set; }
    }
}
