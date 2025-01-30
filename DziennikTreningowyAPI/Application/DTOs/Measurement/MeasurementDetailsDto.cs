namespace DziennikTreningowyAPI.Application.DTOs.Measurement;

public class MeasurementDetailsDto
{
    public Guid Id { get; set; }
    public string BodyPart { get; set; }
    public double Value { get; set; }
    public DateTime Date { get; set; }
    public DateTime UpdatedAt { get; set; }
    public Guid ProfileId { get; set; }
}