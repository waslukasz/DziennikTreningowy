using DziennikTreningowyAPI.Dtos.Exercise;

namespace DziennikTreningowyAPI.Dtos.Training;

public class TrainingDto
{
    public List<ExerciseDto> Exercises { get; set; } = new List<ExerciseDto>();
    public DateTime Timestamp { get; set; }
}