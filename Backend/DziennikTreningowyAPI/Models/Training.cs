namespace DziennikTreningowyAPI.Models;

public class Training
{
    public int Id { get; init; }
    public ICollection<Exercise> Exercises { get; set; } = [];
    public DateTime Timestamp { get; init; } = DateTime.Now;
}