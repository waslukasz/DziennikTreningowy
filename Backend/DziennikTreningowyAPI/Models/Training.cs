namespace DziennikTreningowyAPI.Models;

public class Training
{
    public int Id { get; set; }
    public List<Exercise> Exercises { get; set; } = new List<Exercise>();
    public DateTime Timestamp { get; set; }
}