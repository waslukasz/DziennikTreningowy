using DziennikTreningowyAPI.Domain.Entities;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface IExerciseRepository
{
    Task<Exercise?> GetByIdAsync(Guid exerciseId);
    Task<IEnumerable<Exercise>> GetAllByTrainingIdAsync(Guid trainingId);
    Task AddAsync(Exercise exercise);
    Task UpdateAsync(Exercise exercise);
    Task DeleteAsync(Exercise exercise);
    Task<bool> ExistsAsync(Guid exerciseId);
}