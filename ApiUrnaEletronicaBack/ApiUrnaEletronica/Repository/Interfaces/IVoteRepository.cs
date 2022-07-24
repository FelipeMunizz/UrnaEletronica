using UrnaBackend.Dtos;

namespace UrnaBackend.Services.Interfaces
{
    public interface IVoteRepository
    {
        public Task<List<CandidateDashboardDto>> GetVotes(bool isSorted);
        public Task<bool> AddVote(int candidateId);
    }
}
