using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.WebApi.Controllers;

public class ExerciseController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}