using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Models;

namespace DziennikTreningowyAPI.Interfaces;

public interface IExerciseRepository
{
    Task<List<Exercise>> GetAllAsync();
    Task<Exercise?> GetByIdAsync(int id);
    Task<Exercise> CreateAsync(Exercise exercise);
    Task<Exercise?> UpdateAsync(int id, UpdateExerciseRequestDto request);
    Task<Exercise?> DeleteAsync(int id);
}