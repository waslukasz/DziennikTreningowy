namespace DziennikTreningowyAPI.Application.DTOs.Account;

public class AccountRegisterDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public AccountRegisterProfileDto? Profile { get; set; }
}

public class AccountRegisterProfileDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Gender { get; set; }
    public DateTime? BirthDate { get; set; }
    public double? Height { get; set; }
    public double? Weight { get; set; }
}