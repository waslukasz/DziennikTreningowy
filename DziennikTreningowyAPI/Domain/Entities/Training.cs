namespace DziennikTreningowyAPI.Domain.Entities;

public class Training
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public DateTime Date { get; set; }
    
    public Guid ProfileId { get; set; }
    public Profile Profile { get; set; }
    public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
}