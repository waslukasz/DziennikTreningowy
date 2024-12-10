using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces.Profile;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Infrastructure.Repositories;

public class ProfileRepository : IProfileRepository
{
    private readonly ApplicationDbContext _context;

    public ProfileRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Profile?> GetByIdAsync(Guid id)
    {
        return await _context.Profiles
            .AsNoTracking()
            .FirstOrDefaultAsync(profile => profile.Id == id);
    }

    public async Task<IEnumerable<Profile>> GetAllAsync()
    {
        return await _context.Profiles
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task AddAsync(Profile entity)
    {
        await _context.Profiles.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Profile entity)
    {
        _context.Profiles.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Profile entity)
    {
        _context.Profiles.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Profiles
            .AsNoTracking()
            .AnyAsync(profile => profile.Id == id);
    }

    public async Task<Profile?> GetByAccountIdAsync(Guid accountId)
    {
        return await _context.Profiles
            .AsNoTracking()
            .FirstOrDefaultAsync(profile => profile.AccountId == accountId);
    }
}