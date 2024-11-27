namespace DziennikTreningowyAPI.Domain.Entities;

public class Profile
{
    public Guid Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Gender { get; set; }
    public DateTime? BirthDate { get; set; }
    public double? Height { get; set; }
    public double? Weight { get; set; }
    
    public Guid AccountId { get; set; }
    public Account Account { get; set; }
}