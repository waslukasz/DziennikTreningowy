namespace DziennikTreningowyAPI.Domain.Entities;

public class Training
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; }
    public DateTime TrainingDate { get; set; }
    public User User { get; set; }
    public ICollection<Exercise> Exercises { get; set; }
}