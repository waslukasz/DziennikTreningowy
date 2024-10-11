using Azure.Core;
using DziennikTreningowyAPI.Application.DTOs.User;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Exceptions;
using DziennikTreningowyAPI.Domain.Interfaces;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : Controller
{
    private readonly IUserService _userService;
    private readonly IJwtTokenManager _tokenManager;
    private readonly IValidator<UserCreateDto> _userCreateDtoValidator;
    
    public UserController(IUserService userService, IValidator<UserCreateDto> userCreateDtoValidator)
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
}