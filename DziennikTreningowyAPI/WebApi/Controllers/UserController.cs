using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.WebApi.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        return Ok("test");
    }
}