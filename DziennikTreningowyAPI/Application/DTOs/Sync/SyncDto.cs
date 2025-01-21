using DziennikTreningowyAPI.Domain.Entities;

namespace DziennikTreningowyAPI.Application.DTOs.Sync;

public class SyncDto
{
    public Domain.Entities.Account? Account { get; set; }
    public Domain.Entities.Profile? Profile { get; set; }
    public IEnumerable<Domain.Entities.Training>? Trainings { get; set; }
    public IEnumerable<Domain.Entities.Exercise>? Exercises { get; set; }
    public IEnumerable<Measurment>? Measurments { get; set; }
}