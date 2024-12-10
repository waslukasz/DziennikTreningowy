namespace DziennikTreningowyAPI.Application.DTOs.Exercise;

public class ExerciseUpdateDto
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public int? Sets { get; set; }
    public int? Repetitions { get; set; }
    public double? Weight { get; set; }
    public Guid? TrainingId { get; set; }
}