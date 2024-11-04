using DziennikTreningowyAPI.Application.DTOs.User;
using DziennikTreningowyAPI.Domain.Exceptions;
using DziennikTreningowyAPI.Domain.Interfaces;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Presentation.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : Controller
{
    private readonly IUserService _userService;
    private readonly IValidator<UserCreateDto> _userCreateDtoValidator;

    public AuthController(IUserService userService, IValidator<UserCreateDto> userCreateDtoValidator)
    {
        _userService = userService;
        _userCreateDtoValidator = userCreateDtoValidator;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] UserCreateDto userCreateDto)
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

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
    {
        try
        {
            var user = await _userService.GetByEmailAsync(userLoginDto.Email);
            var tokens = await _userService.AuthenticateAsync(userLoginDto.Email, userLoginDto.Password);
            return Ok(new { tokens.accessToken, tokens.refreshToken});
        }
        catch (ApiException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpPost("refresh")]
    [AllowAnonymous]
    public async Task<IActionResult> RefreshTokens([FromBody] string refreshToken)
    {
        try
        {
            var tokens = _userService.RefreshTokens(refreshToken);
            return Ok(new { tokens.accessToken, tokens.refreshToken });
        }
        catch (ApiException ex)
        {
            return Unauthorized(ex.Message);
        }
    }
}