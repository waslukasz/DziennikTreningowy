namespace DziennikTreningowyAPI.Domain.Entities;

public class Exercise
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public int Repetitions { get; set; }
    public int Sets { get; set; }
    public float Weight { get; set; }
    public Boolean IsDone { get; set; }
    public DateTime Timestamp { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public Guid ProfileId { get; set; }
    public Profile Profile { get; set; }
    public Guid TrainingId { get; set; }
    public virtual Training Training { get; set; }
}