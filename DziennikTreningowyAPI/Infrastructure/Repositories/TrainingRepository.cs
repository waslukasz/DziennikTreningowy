using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Infrastructure.Repositories;

public class TrainingRepository : ITrainingRepository
{
    private readonly ApplicationDbContext _context;

    public TrainingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Training?> GetByIdAsync(Guid trainingId)
    {
        return await _context.Trainings
            .AsNoTracking()
            .FirstOrDefaultAsync(training => training.Id == trainingId);
    }

    public async Task<IEnumerable<Training>> GetAllByUserAsync(Guid userId)
    {
        return await _context.Trainings
            .AsNoTracking()
            .Where(training => training.UserId == userId)
            .ToListAsync();
    }

    public async Task AddAsync(Training training)
    {
        await _context.Trainings.AddAsync(training);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Training training)
    {
        _context.Trainings.Update(training);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Training training)
    {
        _context.Trainings.Remove(training);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(Guid trainingId)
    {
        return await _context.Trainings.AnyAsync(training => training.Id == trainingId);
    }
}