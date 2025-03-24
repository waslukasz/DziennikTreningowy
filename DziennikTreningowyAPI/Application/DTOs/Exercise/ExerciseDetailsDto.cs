namespace DziennikTreningowyAPI.Application.DTOs.Exercise;

public class ExerciseDetailsDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Repetitions { get; set; }
    public int Sets { get; set; }
    public double Weight { get; set; }
    public Boolean IsDone { get; set; }
    public DateTime Timestamp { get; set; }
    public DateTime UpdatedAt { get; set; }
    public Guid ProfileId { get; set; }
    public Guid TrainingId { get; set; }
}