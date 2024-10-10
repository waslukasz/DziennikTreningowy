namespace DziennikTreningowyAPI.Application.DTOs.User;

public class UserDetailsDto
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public DateTime DateOfBirth { get; set; }
    public DateTime CreatedAt { get; set; }

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public double? Weight { get; set; }
    public double? Height { get; set; }
    public string? Gender { get; set; }
    public DateTime? UpdatedAt { get; set; }
}