using DziennikTreningowyAPI.Application.DTOs.Exercise;

namespace DziennikTreningowyAPI.Domain.Interfaces.Exercise;

public interface IExerciseService
{
    Task<ExerciseDetailsDto> GetByIdAsync(Guid exerciseId);
    Task<IEnumerable<ExerciseDetailsDto>> GetAllByTrainingIdAsync(Guid trainingId);
    /*Task AddAsync(ExerciseCreateDto exerciseDto);
    Task UpdateAsync(ExerciseUpdateDto exerciseDto);*/
    Task DeleteAsync(Guid exerciseId);
}