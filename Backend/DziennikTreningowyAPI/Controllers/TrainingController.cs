using AutoMapper;
using DziennikTreningowyAPI.Data;
using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Dtos.Training;
using DziennikTreningowyAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Controllers;

[Route("api/training")]
[ApiController]
public class TrainingController : Controller
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public TrainingController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        // TODO: Add select(exercises) and map them to ExerciseDtos
        List<TrainingDto> trainings = _mapper.Map<List<Training>, List<TrainingDto>>(_context.Trainings.ToList());
        return Ok(trainings);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        // TODO: Add select(exercises) and map to ExerciseDto
        TrainingDto? training = _mapper.Map<Training?, TrainingDto?>(_context.Trainings.Find(id));
        if (training == null) return NotFound();
        return Ok(training);
    }
}