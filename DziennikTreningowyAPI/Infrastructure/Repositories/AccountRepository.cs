using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces.Account;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Infrastructure.Repositories;

public class AccountRepository : IAccountRepository
{
    private readonly ApplicationDbContext _context;

    public AccountRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Account?> GetByIdAsync(Guid id)
    {
        return await _context.Accounts
            .AsNoTracking()
            .FirstOrDefaultAsync(account => account.Id == id);
    }

    public async Task<IEnumerable<Account>> GetAllAsync()
    {
        return await _context.Accounts
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task AddAsync(Account entity)
    {
        await _context.Accounts.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Account entity)
    {
        _context.Accounts.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Account entity)
    {
        _context.Accounts.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsAsync(Guid id)
    {
        return await _context.Accounts
            .AsNoTracking()
            .AnyAsync(account => account.Id == id);
    }

    public async Task<Account?> GetByEmailAsync(string email)
    {
        return await _context.Accounts
            .AsNoTracking()
            .FirstOrDefaultAsync(account => account.Email == email);
    }

    public async Task<bool> ExistsByEmailAsync(string email)
    {
        return await _context.Accounts
            .AsNoTracking()
            .AnyAsync(account => account.Email == email);
    }
}