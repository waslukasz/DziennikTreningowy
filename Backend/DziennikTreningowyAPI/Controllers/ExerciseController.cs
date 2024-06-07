using AutoMapper;
using DziennikTreningowyAPI.Data;
using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Models;
using Microsoft.AspNetCore.Mvc;

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
    public IActionResult GetAll()
    {
        List<ExerciseDto> exerciseDtos = _mapper.Map<List<ExerciseDto>>(_context.Exercises.ToList());
        return Ok(exerciseDtos);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        ExerciseDto exerciseDto = _mapper.Map<ExerciseDto>(_context.Exercises.Find(id));
        if (exerciseDto == null) return NotFound();
        return Ok(exerciseDto);
    }
}