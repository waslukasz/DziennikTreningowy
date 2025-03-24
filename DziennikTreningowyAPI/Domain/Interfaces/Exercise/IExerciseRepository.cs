using DziennikTreningowyAPI.Domain.Interfaces.Utilities;

namespace DziennikTreningowyAPI.Domain.Interfaces.Exercise;

public interface IExerciseRepository : IGenericRepository<Entities.Exercise>
{
    Task<IEnumerable<Entities.Exercise>> GetAllByProfileAsync(Guid profileId);
    Task<IEnumerable<Entities.Exercise>> GetAllByTrainingIdAsync(Guid trainingId);
}