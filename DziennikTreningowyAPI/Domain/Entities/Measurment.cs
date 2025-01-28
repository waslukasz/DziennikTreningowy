namespace DziennikTreningowyAPI.Domain.Entities;

public class Measurment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string BodyPart { get; set; }
    public Double Value { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public Guid ProfileId { get; set; }
    public Profile Profile { get; set; }
}