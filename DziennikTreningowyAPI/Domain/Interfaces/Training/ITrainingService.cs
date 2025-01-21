using DziennikTreningowyAPI.Application.DTOs.Training;

namespace DziennikTreningowyAPI.Domain.Interfaces.Training;

public interface ITrainingService
{
    Task<TrainingDetailsDto> GetByIdAsync(Guid trainingId);
    Task<IEnumerable<TrainingDetailsDto>> GetAllByUserIdAsync(Guid userId);
    Task AddAsync(TrainingCreateDto dto);
    Task UpdateAsync(TrainingUpdateDto dto);
    Task DeleteAsync(Guid trainingId);
}