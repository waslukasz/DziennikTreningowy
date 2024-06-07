using DziennikTreningowyAPI.Dtos.Exercise;

namespace DziennikTreningowyAPI.Dtos.Training;

public class TrainingDto
{
    public int Id { get; set; }
    public List<ExerciseDto> Exercises { get; set; } = new List<ExerciseDto>();
    public DateTime Timestamp { get; set; }
}