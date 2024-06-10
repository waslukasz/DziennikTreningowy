using DziennikTreningowyAPI.Dtos.Training;
using DziennikTreningowyAPI.Models;

namespace DziennikTreningowyAPI.Interfaces;

public interface ITrainingRepository
{
    Task<List<Training>> GetAllAsync();
    Task<Training?> GetByIdAsync(int id);
    Task<Training> CreateAsync(Training training);
    Task<Training?> DeleteAsync(int id);
}