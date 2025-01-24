namespace DziennikTreningowyAPI.Application.DTOs.Training;

public class TrainingSaveDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public DateTime UpdatedAt { get; set; }
}