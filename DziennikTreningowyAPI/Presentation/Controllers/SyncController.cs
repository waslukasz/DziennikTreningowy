using System.Security.Claims;
using DziennikTreningowyAPI.Application.DTOs.Sync;
using DziennikTreningowyAPI.Domain.Interfaces.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Presentation.Controllers;

[ApiController]
public class SyncController : Controller
{
    private readonly ISyncService _syncService;

    public SyncController(ISyncService syncService)
    {
        _syncService = syncService;
    }

    [HttpGet("api/sync")]
    [Authorize]
    public async Task<IActionResult> Synchronize([FromQuery] DateTime? lastSync)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        try
        {
            var result = await _syncService.SyncDataAsync(Guid.Parse(userIdClaim), lastSync);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("api/save")]
    [Authorize]
    public async Task<IActionResult> SaveData([FromBody] SyncDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier).Value;

        try
        {
            await _syncService.SaveDataAsync(Guid.Parse(userIdClaim), dto);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
}