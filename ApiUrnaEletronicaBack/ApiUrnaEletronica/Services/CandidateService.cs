using ApiUrnaEletronica.Data;
using ApiUrnaEletronica.Models;
using AutoMapper;
using UrnaBackend.Dtos;
using UrnaBackend.Services.Interfaces;

namespace UrnaBackend.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly UrnaContext _dbContext;
        private readonly IMapper _mapper;


        public CandidateService(UrnaContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<bool> AddCandidate(CandidateRegisterDto candidate)
        {
            var candidateAlreadyExists = _dbContext.Candidates.FirstOrDefault(c => c.ElectoralNumber == candidate.ElectoralNumber);

            if (candidateAlreadyExists != null)
                return true;

            var mappedCandidate = _mapper.Map<Candidate>(candidate);
            _dbContext.Candidates.Add(mappedCandidate);
            await _dbContext.SaveChangesAsync();
            return false;
        }

        public async Task<bool> DeleteCandidate(int candidateId)
        {
            var candidate = _dbContext.Candidates.FirstOrDefault((c => c.Id == candidateId));

            if (candidate == null)
                return false;

            _dbContext.Candidates.Remove(candidate);
            await _dbContext.SaveChangesAsync();
            return true;
        }


        public CandidateUrnDto GetCandidateByElectoralNumber(int electoralNumber)
        {
            var candidate = _dbContext.Candidates.FirstOrDefault((c => c.ElectoralNumber == electoralNumber));
            var mappedCandidate = _mapper.Map<CandidateUrnDto>(candidate);
            return mappedCandidate;
        }
    }
}
