using AutoMapper;
using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Interfaces;
using DziennikTreningowyAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Controllers;

[Route("api/exercise")]
[ApiController]
public class ExerciseController(IExerciseRepository exerciseRepository, IMapper mapper) : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        List<Exercise> exercises = await exerciseRepository.GetAllAsync();
        List<ExerciseDto> exerciseDtos = mapper.Map<List<ExerciseDto>>(exercises);
        return Ok(exerciseDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        Exercise? exercise = await exerciseRepository.GetByIdAsync(id);
        if (exercise == null) return NotFound();
        ExerciseDto exerciseDto = mapper.Map<ExerciseDto>(exercise);
        return Ok(exerciseDto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateExerciseRequestDto request)
    {
        Exercise exercise = mapper.Map<CreateExerciseRequestDto, Exercise>(request);
        await exerciseRepository.CreateAsync(exercise);
        ExerciseDto exerciseDto = mapper.Map<Exercise, ExerciseDto>(exercise);
        return CreatedAtAction(nameof(GetById), new { id = exercise.Id }, exerciseDto);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExerciseRequestDto request)
    {
        Exercise? exercise = await exerciseRepository.UpdateAsync(id, request);
        if (exercise == null) return NotFound();
        ExerciseDto exerciseDto = mapper.Map<Exercise, ExerciseDto>(exercise);
        return Ok(exerciseDto);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        Exercise? exercise = await exerciseRepository.DeleteAsync(id);
        if (exercise == null) return NotFound();
        return NoContent();
    }
}