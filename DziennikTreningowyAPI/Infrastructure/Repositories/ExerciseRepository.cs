using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces.Exercise;
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

    public async Task<Exercise?> GetByIdAsync(Guid id)
    {
        return await _context.Exercises
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<Exercise>> GetAllAsync()
    {
        return await _context.Exercises
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task AddAsync(Exercise entity)
    {
        await _context.Exercises.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Exercise entity)
    {
        _context.Exercises.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Exercise entity)
    {
        _context.Exercises.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Exercises
            .AsNoTracking()
            .AnyAsync(exercise => exercise.Id == id);
    }

    public async Task<IEnumerable<Exercise>> GetAllByTrainingIdAsync(Guid trainingId)
    {
        return await _context.Exercises
            .AsNoTracking()
            .Where(exercise => exercise.TrainingId == trainingId)
            .ToListAsync();
    }
}