using DziennikTreningowyAPI.Domain.Entities;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface ITrainingRepository
{
    Task<Training?> GetByIdAsync(Guid trainingId);
    Task<IEnumerable<Training>> GetAllByUserAsync(Guid userId);
    Task AddAsync(Training training);
    Task UpdateAsync(Training training);
    Task DeleteAsync(Training training);
    Task<bool> ExistsAsync(Guid trainingId);
}