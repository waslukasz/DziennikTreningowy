namespace DziennikTreningowyAPI.Application.DTOs.Exercise;

public class ExerciseSaveDto
{
    public Guid Id { get; set; }
    public Guid TrainingId { get; set; }
    public string Name { get; set; }
    public int Repetitions { get; set; }
    public int Sets { get; set; }
    public float Weight { get; set; }
    public Boolean IsDone { get; set; }
    public DateTime Timestamp { get; set; }
    public DateTime UpdatedAt { get; set; }
}