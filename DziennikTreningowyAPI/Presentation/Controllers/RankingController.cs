using System.Security.Claims;
using DziennikTreningowyAPI.Domain.Exceptions;
using DziennikTreningowyAPI.Domain.Interfaces.Ranking;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Presentation.Controllers;

[ApiController]
public class RankingController : Controller
{
    private readonly IRankingService _rankingService;

    public RankingController(IRankingService rankingService)
    {
        _rankingService = rankingService;
    }

    [HttpGet("ranking")]
    [Authorize]
    public async Task<IActionResult> Ranking()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(await _rankingService.GetRankingAsync(Guid.Parse(userIdClaim)));
        }
        catch (ApiException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}