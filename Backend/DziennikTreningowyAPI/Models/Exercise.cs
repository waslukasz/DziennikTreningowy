using System.ComponentModel.DataAnnotations;

namespace DziennikTreningowyAPI.Models;

public class Exercise
{
    public int Id { get; set; }
    [MaxLength(30)]
    public string Name { get; set; } = string.Empty;
    [MaxLength(30)]
    public string Description { get; set; } = string.Empty;
    public int? Weight { get; set; }
    public int? Repetitions { get; set; }
    public TimeSpan? Duration { get; set; }
    public int? TrainingId { get; set; }
    public Training? Training { get; set; }
    public DateTime Timestamp { get; init; }
}