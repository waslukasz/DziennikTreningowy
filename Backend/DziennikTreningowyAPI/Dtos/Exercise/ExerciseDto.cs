namespace DziennikTreningowyAPI.Dtos.Exercise;

public class ExerciseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int? Weight { get; set; }
    public int? Repetitions { get; set; }
    public TimeSpan? Duration { get; set; }
    public int? TrainingId { get; set; }
    public DateTime Timestamp { get; set; }
}