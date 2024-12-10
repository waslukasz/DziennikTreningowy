/*using Azure.Core;
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
[Route("api/user")]
public class UserController : Controller
{
    private readonly IUserService _userService;
    
    public UserController(IUserService userService, IValidator<UserCreateDto> userCreateDtoValidator)
    {
        _userService = userService;
    }
}*/