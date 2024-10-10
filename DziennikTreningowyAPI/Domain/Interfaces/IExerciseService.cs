using DziennikTreningowyAPI.Application.DTOs.Exercise;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface IExerciseService
{
    Task<ExerciseDetailsDto> GetByIdAsync(Guid exerciseId);
    Task<IEnumerable<ExerciseDetailsDto>> GetAllByTrainingIdAsync(Guid trainingId);
    Task AddExerciseAsync(ExerciseCreateDto exerciseDto);
    Task UpdateExerciseAsync(Guid exerciseId, ExerciseUpdateDto exerciseDto);
    Task DeleteExerciseAsync(Guid exerciseId);
}