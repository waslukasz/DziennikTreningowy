using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces.Training;
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

    public async Task<Training?> GetByIdAsync(Guid id)
    {
        return await _context.Trainings
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<Training>> GetAllAsync()
    {
        return await _context.Trainings
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task AddAsync(Training entity)
    {
        await _context.Trainings.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Training entity)
    {
        _context.Trainings.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Training entity)
    {
        _context.Trainings.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Trainings
            .AsNoTracking()
            .AnyAsync(training => training.Id == id);
    }

    public async Task<IEnumerable<Training>> GetAllByProfileAsync(Guid profileId)
    {
        return await _context.Trainings
            .AsNoTracking()
            .Where(training => training.ProfileId == profileId)
            .ToListAsync();
    }
}