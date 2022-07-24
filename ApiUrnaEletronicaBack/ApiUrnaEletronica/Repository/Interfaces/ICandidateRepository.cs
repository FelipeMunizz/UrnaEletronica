using UrnaBackend.Dtos;

namespace UrnaBackend.Services.Interfaces
{
    public interface ICandidateRepository
    {
        public Task<bool> DeleteCandidate(int candidateId);
        public Task<bool> AddCandidate(CandidateRegisterDto candidate);
        public CandidateUrnDto GetCandidateByElectoralNumber(int electoralNumber);
    }
}
