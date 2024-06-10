namespace DziennikTreningowyAPI.Dtos.Exercise;

public class CreateExerciseRequest
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int? Weight { get; set; }
    public int? Repetitions { get; set; }
    public TimeSpan? Duration { get; set; }
    public int TrainingId { get; set; }
}