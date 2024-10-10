using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Infrastructure.Repositories;

public class ExerciseRepository : IExerciseRepository
{
    private readonly ApplicationDbContext _context;

    public ExerciseRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Exercise?> GetByIdAsync(Guid exerciseId)
    {
        return await _context.Exercises
            .AsNoTracking()
            .FirstOrDefaultAsync(exercise => exercise.Id == exerciseId);
    }

    public async Task<IEnumerable<Exercise>> GetAllByTrainingIdAsync(Guid trainingId)
    {
        return await _context.Exercises
            .AsNoTracking()
            .Where(exercise => exercise.TrainingId == trainingId)
            .ToListAsync();
    }

    public async Task AddAsync(Exercise exercise)
    {
        await _context.Exercises.AddAsync(exercise);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Exercise exercise)
    {
        _context.Exercises.Update(exercise);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Exercise exercise)
    {
        _context.Exercises.Remove(exercise);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(Guid exerciseId)
    {
        return await _context.Exercises.AnyAsync(exercise => exercise.Id == exerciseId);
    }
}