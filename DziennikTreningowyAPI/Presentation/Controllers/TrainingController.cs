using DziennikTreningowyAPI.Domain.Exceptions.Training;
using DziennikTreningowyAPI.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Presentation.Controllers;

[ApiController]
[Route("api/training")]
public class TrainingController : Controller
{
    private readonly ITrainingService _trainingService;

    public TrainingController(ITrainingService trainingService)
    {
        _trainingService = trainingService;
    }

    [HttpGet("{trainingId:guid}")]
    public async Task<IActionResult> GetTrainingById(Guid trainingId)
    {
        try
        {
            var training = await _trainingService.GetByIdAsync(trainingId);
            return Ok(training);
        }
        catch (TrainingNotFoundException exception)
        {
            return NotFound(exception.Message);
        }
    }
}