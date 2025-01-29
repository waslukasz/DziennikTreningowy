namespace DziennikTreningowyAPI.Application.DTOs.Profile;

public class ProfileSaveDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Gender { get; set; }
    public double? Height { get; set; }
    public double? Weight { get; set; }
    public DateTime? Birthday { get; set; }
    public DateTime? UpdatedAt { get; set; }
}