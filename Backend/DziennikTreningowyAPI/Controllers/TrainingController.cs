using DziennikTreningowyAPI.Dtos.Training;
using DziennikTreningowyAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Controllers;

[Route("api/training")]
[ApiController]
public class TrainingController(ITrainingService trainingService) : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        List<TrainingDto> trainingDtos = await trainingService.GetAllAsync();
        return Ok(trainingDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        TrainingDto? trainingDto = await trainingService.GetByIdAsync(id);
        if (trainingDto == null) return NotFound();
        return Ok(trainingDto);
    }
}