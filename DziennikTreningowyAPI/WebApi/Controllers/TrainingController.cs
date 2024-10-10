using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.WebApi.Controllers;

public class TrainingController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}