using DziennikTreningowyAPI.Data;
using DziennikTreningowyAPI.Interfaces;
using DziennikTreningowyAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Repositories;

public class TrainingRepository(ApplicationDbContext context) : ITrainingRepository
{
    public async Task<List<Training>> GetAllAsync()
    {
        return await context.Trainings.Include((t) => t.Exercises).ToListAsync();
    }

    public async Task<Training?> GetByIdAsync(int id)
    {
        return await context.Trainings.Include((t) => t.Exercises).FirstOrDefaultAsync((t) => t.Id == id);
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