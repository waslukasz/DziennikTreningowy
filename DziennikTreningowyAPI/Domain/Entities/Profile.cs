namespace DziennikTreningowyAPI.Domain.Entities;

public class Profile
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Gender { get; set; }
    public DateTime? BirthDate { get; set; }
    public double? Height { get; set; }
    public double? Weight { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public Guid AccountId { get; set; }
    public Account Account { get; set; }
    public ICollection<Training> Trainings { get; set; } = new List<Training>();
    public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    public ICollection<Measurment> Measurments { get; set; } = new List<Measurment>();
}