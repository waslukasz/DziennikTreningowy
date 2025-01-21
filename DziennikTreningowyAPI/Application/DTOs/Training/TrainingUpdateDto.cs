namespace DziennikTreningowyAPI.Application.DTOs.Training;

public class TrainingUpdateDto
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public DateTime? TrainingDate { get; set; }
}