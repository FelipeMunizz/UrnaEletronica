using ApiUrnaEletronica.Data;
using ApiUrnaEletronica.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UrnaBackend.Dtos;
using UrnaBackend.Services.Interfaces;

namespace UrnaBackend.Services
{
    public class VoteRepository : IVoteRepository
    {
        private readonly UrnaContext _dbContext;
        private readonly IMapper _mapper;

        public VoteRepository(UrnaContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<bool> AddVote(int electoralNumber)
        {
            var candidate = await _dbContext.Candidates.FirstOrDefaultAsync(c => c.ElectoralNumber == electoralNumber);

            if (candidate == null)
                return false;

            var vote = new Vote { Candidate = candidate };

            await _dbContext.Votes.AddAsync(vote);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<CandidateDashboardDto>> GetVotes(bool isSorted)
        {
            var candidatesWithVotes = await _dbContext.Candidates.Include(c => c.Votes).ToListAsync();

            var mappedModelCandidates = candidatesWithVotes.Select(candidate => _mapper.Map<CandidateDashboardDto>(candidate)).ToList();

            foreach (var candidate in mappedModelCandidates)
            {
                candidate.VoteCount = candidatesWithVotes.FirstOrDefault(c => c.Id == candidate.Id)?.Votes?.Count;
            }

            return isSorted ? mappedModelCandidates.OrderByDescending(c => c.VoteCount).ToList()
                            : mappedModelCandidates.ToList();

        }
    }
}
