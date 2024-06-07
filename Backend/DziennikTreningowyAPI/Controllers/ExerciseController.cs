using DziennikTreningowyAPI.Data;
using DziennikTreningowyAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Controllers;

[Route("api/exercise")]
[ApiController]
public class ExerciseController : Controller
{
    private readonly ApplicationDbContext _context;
    public ExerciseController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        List<Exercise> exercises = _context.Exercises.ToList();
        return Ok(exercises);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        Exercise? exercise = _context.Exercises.Find(id);
        if (exercise == null) return NotFound();
        return Ok(exercise);
    }
}