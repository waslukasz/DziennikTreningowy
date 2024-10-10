namespace DziennikTreningowyAPI.Domain.Entities;

public class User
{
    private Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Username { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public DateTime DateOfBirth { get; set; }
    public double? Weight { get; set; }
    public double? Height { get; set; }
    public string? Gender { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public virtual ICollection<Training> Trainings { get; set; }
}