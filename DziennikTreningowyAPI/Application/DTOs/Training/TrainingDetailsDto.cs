using DziennikTreningowyAPI.Application.DTOs.Exercise;

namespace DziennikTreningowyAPI.Application.DTOs.Training;

public class TrainingDetailsDto
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public DateTime Timestamp { get; set; }
    public DateTime UpdatedAt { get; set; }
}