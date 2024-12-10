namespace DziennikTreningowyAPI.Application.DTOs.Account;

public class AccountUpdateDto
{
    public string? NewEmail { get; set; }
    public string? NewPassword { get; set; }
    public string CurrentPassword { get; set; }
}