using AutoMapper;
using DziennikTreningowyAPI.Data;
using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Controllers;

[Route("api/exercise")]
[ApiController]
public class ExerciseController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    
    public ExerciseController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        List<Exercise> exercises = await _context.Exercises.ToListAsync();
        List<ExerciseDto> exerciseDtos = _mapper.Map<List<ExerciseDto>>(exercises);
        return Ok(exerciseDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        Exercise? exercise = await _context.Exercises.FindAsync(id);
        if (exercise == null) return NotFound();
        ExerciseDto exerciseDto = _mapper.Map<ExerciseDto>(exercise);
        return Ok(exerciseDto);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateExerciseRequest dto)
    {
        Exercise exerciseModel = _mapper.Map<CreateExerciseRequest, Exercise>(dto);

        Training? training = await _context.Trainings.FindAsync(dto.TrainingId); // TODO: If does not exist, create new
        if (training == null) return NotFound(); // TODO: Training not found
        
        await _context.Exercises.AddAsync(exerciseModel);
        await _context.SaveChangesAsync();

        ExerciseDto exerciseDto = _mapper.Map<Exercise, ExerciseDto>(exerciseModel);
        return CreatedAtAction(nameof(GetById), new { id = exerciseModel.Id }, exerciseDto);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateExerciseRequest dto)
    {
        Exercise? exerciseModel = await _context.Exercises.FindAsync(id);
        if (exerciseModel == null) return NotFound();

        Training? training = await _context.Trainings.FindAsync(dto.TrainingId);
        if (training == null) return NotFound(); // TODO: Training not found

        exerciseModel.Name = dto.Name;
        exerciseModel.Description = dto.Description;
        exerciseModel.Weight = dto.Weight;
        exerciseModel.Repetitions = dto.Repetitions;
        exerciseModel.Duration = dto.Duration;
        exerciseModel.TrainingId = dto.TrainingId;
        await _context.SaveChangesAsync();

        ExerciseDto exerciseDto = _mapper.Map<Exercise, ExerciseDto>(exerciseModel);
        return Ok(exerciseDto);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        Exercise? exerciseModel = await _context.Exercises.FindAsync(id);
        if (exerciseModel == null) return NotFound();
        _context.Exercises.Remove(exerciseModel);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}