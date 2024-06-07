using DziennikTreningowyAPI.Data;
using DziennikTreningowyAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Controllers;

[Route("api/training")]
[ApiController]
public class TrainingController : Controller
{
    private readonly ApplicationDbContext _context;
    public TrainingController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        List<Training> trainings = _context.Trainings.ToList();
        return Ok(trainings);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        Training? training = _context.Trainings.Find(id);
        if (training == null) return NotFound();
        return Ok(training);
    }
}