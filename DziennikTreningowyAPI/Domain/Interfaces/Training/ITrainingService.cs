using DziennikTreningowyAPI.Application.DTOs.Training;

namespace DziennikTreningowyAPI.Domain.Interfaces.Training;

public interface ITrainingService
{
    Task<TrainingDetailsDto> GetByIdAsync(Guid trainingId);
    Task<IEnumerable<TrainingDetailsDto>> GetAllByUserIdAsync(Guid userId);
    Task AddAsync(TrainingCreateDto trainingDto);
    Task UpdateAsync(TrainingUpdateDto trainingDto);
    Task DeleteAsync(Guid trainingId);
}