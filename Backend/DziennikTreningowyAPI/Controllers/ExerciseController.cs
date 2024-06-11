using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Controllers;

[Route("api/exercise")]
[ApiController]
public class ExerciseController(IExerciseService exerciseService) : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        List<ExerciseDto> exerciseDtos = await exerciseService.GetAllAsync();
        return Ok(exerciseDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        ExerciseDto? exerciseDto = await exerciseService.GetByIdAsync(id);
        if (exerciseDto == null) return NotFound();
        return Ok(exerciseDto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateExerciseRequestDto request)
    {
        ExerciseDto exerciseDto = await exerciseService.CreateAsync(request);
        return Ok(exerciseDto);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExerciseRequestDto request)
    {
        ExerciseDto? exerciseDto = await exerciseService.UpdateAsync(id, request);
        return Ok(exerciseDto);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        ExerciseDto? exerciseDto = await exerciseService.DeleteAsync(id);
        if (exerciseDto == null) return NotFound();
        return NoContent();
    }
}