using DziennikTreningowyAPI.Application.DTOs.Exercise;

namespace DziennikTreningowyAPI.Application.DTOs.Training;

public class TrainingDetailsDto
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public DateTime UpdatedAt { get; set; }
    public ICollection<ExerciseDetailsDto> Exercises { get; set; }
}