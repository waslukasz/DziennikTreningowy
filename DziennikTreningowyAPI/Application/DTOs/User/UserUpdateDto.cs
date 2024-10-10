﻿namespace DziennikTreningowyAPI.Application.DTOs.User;

public class UserUpdateDto
{
    public string? Email { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Weight { get; set; }
    public string? Height { get; set; }
    public string? Gender { get; set; }
    public string? CurrentPassword { get; set; }
}