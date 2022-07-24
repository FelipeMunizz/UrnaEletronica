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

        return candidate != null ? Ok(candidate) : NotFound("Candidato não encontrado");
    }

    [HttpDelete]
    public async Task<IActionResult> Delete([FromBody] int candidateId)
    {
        var beenDeleted = await _candidatesRepository.DeleteCandidate(candidateId);

        return beenDeleted ? Ok() : NotFound("O candidato com o ID enviado não foi encontrado");
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CandidateRegisterDto candidate)
    {
        if (candidate.ElectoralNumber < 10 || candidate.ElectoralNumber > 99)
        {
            return BadRequest("A legenda do candidato deve haver dois digitos");
        }

        var candidateAlreadyExists = await _candidatesRepository.AddCandidate(candidate);

        return candidateAlreadyExists == true ? Unauthorized("O candidato com esta legenda já existe") : Ok();
    }
}