using ApiUrnaEletronica.Data;
using Microsoft.AspNetCore.Mvc;
using UrnaBackend.Dtos;
using UrnaBackend.Services.Interfaces;

namespace UrnaApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CandidatesController : ControllerBase
{
    private readonly UrnaContext _context;
    private readonly ICandidateRepository _candidatesRepository;

    public CandidatesController(UrnaContext context, ICandidateRepository candidatesRepository)
    {
        _context = context;
        _candidatesRepository = candidatesRepository;
    }

    [HttpGet]
    public IActionResult Get(int electoralNumber)
    {
        var candidate = _candidatesRepository.GetCandidateByElectoralNumber(electoralNumber);

        return candidate != null ? Ok(candidate) : NotFound("Candidato n�o encontrado");
    }

    [HttpDelete]
    public async Task<IActionResult> Delete([FromBody] int candidateId)
    {
        var candidate = await _candidatesRepository.DeleteCandidate(candidateId);

        return candidate ? Ok() : NotFound("O candidato com o ID enviado n�o foi encontrado");
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CandidateRegisterDto candidate)
    {
        if (candidate.ElectoralNumber < 10 || candidate.ElectoralNumber > 99)
        {
            return BadRequest("A legenda do candidato deve haver dois digitos");
        }

        var candidateExiste = await _candidatesRepository.AddCandidate(candidate);

        return candidateExiste == true ? Unauthorized("O candidato com esta legenda j� existe") : Ok();
    }
}