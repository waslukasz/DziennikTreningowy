using DziennikTreningowyAPI.Application.DTOs.Training;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface ITrainingService
{
    Task<TrainingDetailsDto> GetByIdAsync(Guid trainingId);
    Task<IEnumerable<TrainingDetailsDto>> GetAllByUserIdAsync(Guid userId);
    Task AddTrainingAsync(TrainingCreateDto trainingDto);
    Task UpdateTrainingAsync(Guid trainingId, TrainingUpdateDto trainingDto);
    Task DeleteTrainingAsync(Guid trainingId);
}