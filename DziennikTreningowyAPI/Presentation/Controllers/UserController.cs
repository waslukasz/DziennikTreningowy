using DziennikTreningowyAPI.Application.DTOs.User;
using DziennikTreningowyAPI.Domain.Interfaces;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly IUserService _userService;
    private readonly IJwtTokenManager _tokenManager;
    private readonly IValidator<UserCreateDto> _userCreateDtoValidator;
    
    public UserController(IUserService userService, IJwtTokenManager tokenManager, IValidator<UserCreateDto> userCreateDtoValidator)
    {
        _userService = userService;
        _userCreateDtoValidator = userCreateDtoValidator;
        _tokenManager = tokenManager;
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserCreateDto userCreateDto)
    {
        ValidationResult validationResult = await _userCreateDtoValidator.ValidateAsync(userCreateDto);
        if (!validationResult.IsValid)
        {
            foreach (var error in validationResult.Errors)
            {
                ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
            }
            return BadRequest(ModelState);
        }
        
        await _userService.AddUserAsync(userCreateDto);
        return Ok();
    }
}