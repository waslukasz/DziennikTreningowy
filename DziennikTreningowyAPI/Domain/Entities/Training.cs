namespace DziennikTreningowyAPI.Domain.Entities;

public class Training
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime Timestamp { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public Guid ProfileId { get; set; }
    public Profile Profile { get; set; }
    public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
}