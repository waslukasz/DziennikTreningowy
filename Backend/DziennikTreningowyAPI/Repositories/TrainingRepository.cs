using DziennikTreningowyAPI.Data;
using DziennikTreningowyAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Repositories;

public interface ITrainingRepository
{
    Task<List<Training>> GetAllAsync();
    Task<Training?> GetByIdAsync(int id);
    Task<Training> CreateAsync(Training training);
    Task<Training?> DeleteAsync(int id);
}

public class TrainingRepository(ApplicationDbContext context) : ITrainingRepository
{
    public async Task<List<Training>> GetAllAsync()
    {
        List<Training> trainings = await context.Trainings.Include((t) => t.Exercises).ToListAsync();
        return trainings;
    }

    public async Task<Training?> GetByIdAsync(int id)
    {
        Training? training = await context.Trainings.Include((t) => t.Exercises).FirstOrDefaultAsync((t) => t.Id == id);
        return training;
    }

    public async Task<Training> CreateAsync(Training training)
    {
        await context.Trainings.AddAsync(training);
        await context.SaveChangesAsync();
        return training;
    }

    public async Task<Training?> DeleteAsync(int id)
    {
        Training? training = await context.Trainings.FindAsync(id);
        if (training == null) return null;
        context.Trainings.Remove(training);
        await context.SaveChangesAsync();
        return training;
    }
}