namespace DziennikTreningowyAPI.Application.DTOs.Measurement;

public class MeasurementSaveDto
{
    public Guid Id { get; set; }
    public string BodyPart { get; set; }
    public double Value { get; set; }
    public DateTime Date { get; set; }
    public DateTime UpdatedAt { get; set; }
}