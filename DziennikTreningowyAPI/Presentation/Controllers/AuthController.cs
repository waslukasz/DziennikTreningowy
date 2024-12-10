using System.Security.Claims;
using DziennikTreningowyAPI.Application.DTOs.Account;
using DziennikTreningowyAPI.Domain.Exceptions;
using DziennikTreningowyAPI.Domain.Interfaces.Account;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DziennikTreningowyAPI.Presentation.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : Controller
{
    private readonly IAccountService _accountService;
    private readonly IValidator<AccountRegisterDto> _accountRegisterDtoValidator;

    public AuthController(IAccountService accountService, IValidator<AccountRegisterDto> accountRegisterDtoValidator)
    {
        _accountService = accountService;
        _accountRegisterDtoValidator = accountRegisterDtoValidator;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] AccountLoginDto dto)
    {
        try
        {
            var tokens = await _accountService.AuthenticateAsync(dto.Email, dto.Password);
            return Ok(new { tokens.accessToken, tokens.refreshToken});
        }
        catch (ApiException ex)
        {
            return Unauthorized(ex.Message);
        }
    }
    
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] AccountRegisterDto dto)
    {
        try
        {
            ValidationResult validationResult = await _accountRegisterDtoValidator.ValidateAsync(dto);

            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                {
                    ModelState.AddModelError(error.PropertyName, error.ErrorMessage);
                }

                return BadRequest(ModelState);
            }

            await _accountService.AddAsync(dto);
            return Ok();
        }
        catch (ApiException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("refresh")] // TODO: FIX
    [AllowAnonymous]
    public async Task<IActionResult> RefreshTokens([FromBody] string refreshToken)
    {
        try
        {
            var tokens = await _accountService.RefreshTokens(refreshToken);
            return Ok(new { tokens.accessToken, tokens.refreshToken });
        }
        catch (ApiException ex)
        {
            return Unauthorized(ex.Message);
        }
    }

    [HttpPut("update")]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] AccountUpdateDto dto)
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            await _accountService.UpdateAsync(Guid.Parse(userIdClaim), dto);
            return Ok();
        }
        catch (ApiException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("delete")]
    [Authorize]
    public async Task<IActionResult> Delete()
    {
        // TODO: Soft delete, turn account inactive, and make a way to delete data permanently after 1 month.
        throw new NotImplementedException();
    }
}