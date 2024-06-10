using AutoMapper;
using DziennikTreningowyAPI.Dtos.Training;
using DziennikTreningowyAPI.Models;
using DziennikTreningowyAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Controllers;

[Route("api/training")]
[ApiController]
public class TrainingController(ITrainingRepository repository, IMapper mapper) : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        List<Training> trainings = await repository.GetAllAsync();
        List<TrainingDto> trainingDtos = mapper.Map<List<Training>, List<TrainingDto>> (trainings);
        return Ok(trainingDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        Training? training = await repository.GetByIdAsync(id);
        if (training == null) return NotFound();
        TrainingDto trainingDto = mapper.Map<Training, TrainingDto>(training);
        return Ok(trainingDto);
    }
}