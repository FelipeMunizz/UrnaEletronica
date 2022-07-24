using UrnaBackend.Dtos;

namespace UrnaBackend.Services.Interfaces
{
    public interface IVoteService
    {
        public Task<List<CandidateDashboardDto>> GetVotes(bool isSorted);
        public Task<bool> AddVote(int candidateId);
    }
}
