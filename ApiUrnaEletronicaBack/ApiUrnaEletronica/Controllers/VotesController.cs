using Microsoft.AspNetCore.Mvc;
using UrnaBackend.Services.Interfaces;

namespace UrnaBackend.Controllers;

[Route("[controller]")]
[ApiController]
public class VotesController : ControllerBase
{
    private readonly IVoteRepository _voteRepository;

    public VotesController(IVoteRepository voteRepository)
    {
        _voteRepository = voteRepository;
    }

    [HttpGet]
    public async Task<IActionResult> Get(bool isSorted)
    {
        var candidates = await _voteRepository.GetVotes(isSorted);
        return candidates != null ? Ok(candidates) : Unauthorized("Falha ao buscar os candidatos");
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] int electoralNumber)
    {
        var candidateExiste = await _voteRepository.AddVote(electoralNumber);
        return candidateExiste == true ? Ok() : NotFound("O candidato que você está tentando votar não existe");
    }
}
