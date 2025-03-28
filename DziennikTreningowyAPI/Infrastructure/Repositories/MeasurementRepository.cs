﻿using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces.Measurement;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Infrastructure.Repositories;

public class MeasurementRepository : IMeasurementRepository
{
    private readonly ApplicationDbContext _context;

    public MeasurementRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Measurement?> GetByIdAsync(Guid id)
    {
        return await _context.Measurements
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<Measurement>> GetAllAsync()
    {
        return await _context.Measurements
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task AddAsync(Measurement entity)
    {
        await _context.Measurements.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Measurement entity)
    {
        _context.Measurements.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Measurement entity)
    {
        _context.Measurements.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Measurements
            .AsNoTracking()
            .AnyAsync(x => x.Id == id);
    }
    
    public async Task<IEnumerable<Measurement>> GetAllByProfileAsync(Guid profileId)
    {
        return await _context.Measurements
            .AsNoTracking()
            .Where(x => x.ProfileId == profileId)
            .ToListAsync();
    }
}