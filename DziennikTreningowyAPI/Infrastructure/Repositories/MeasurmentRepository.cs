using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces.Measurment;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Infrastructure.Repositories;

public class MeasurmentRepository : IMeasurmentRepository
{
    private readonly ApplicationDbContext _context;

    public MeasurmentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Measurment?> GetByIdAsync(Guid id)
    {
        return await _context.Measurments
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<Measurment>> GetAllAsync()
    {
        return await _context.Measurments
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task AddAsync(Measurment entity)
    {
        await _context.Measurments.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Measurment entity)
    {
        _context.Measurments.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Measurment entity)
    {
        _context.Measurments.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Measurments
            .AsNoTracking()
            .AnyAsync(x => x.Id == id);
    }
    
    public async Task<IEnumerable<Measurment>> GetAllByProfileAsync(Guid profileId)
    {
        return await _context.Measurments
            .AsNoTracking()
            .Where(x => x.ProfileId == profileId)
            .ToListAsync();
    }
}