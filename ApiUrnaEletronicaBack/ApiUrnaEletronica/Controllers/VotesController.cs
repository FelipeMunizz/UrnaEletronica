using Microsoft.AspNetCore.Mvc;
using UrnaBackend.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrnaBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VotesController : ControllerBase
    {
        private readonly IVoteRepository _voteService;

        public VotesController(IVoteRepository voteService)
        {
            _voteService = voteService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(bool isSorted)
        {
            var candidates = await _voteService.GetVotes(isSorted);
            return candidates != null ? Ok(candidates) : Unauthorized("Falha ao buscar os candidatos");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] int electoralNumber)
        {
            var candidateExists = await _voteService.AddVote(electoralNumber);
            return candidateExists == true ? Ok() : NotFound("O candidato que você está tentando votar não existe");
        }
    }
}
