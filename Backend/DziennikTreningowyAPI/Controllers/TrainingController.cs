using AutoMapper;
using DziennikTreningowyAPI.Data;
using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Dtos.Training;
using DziennikTreningowyAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IActionResult> GetAll()
    {
        List<Training> trainings = await _context.Trainings.Include((t) => t.Exercises).ToListAsync();
        List<TrainingDto> trainingDtos = _mapper.Map<List<Training>, List<TrainingDto>> (trainings);
        return Ok(trainingDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        Training? training = await _context.Trainings.FindAsync(id);
        if (training == null) return NotFound();
        TrainingDto trainingDto = _mapper.Map<Training, TrainingDto>(training);
        return Ok(trainingDto);
    }
}