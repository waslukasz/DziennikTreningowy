using DziennikTreningowyAPI.Application.DTOs.Ranking;
using DziennikTreningowyAPI.Domain.Interfaces.Ranking;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace DziennikTreningowyAPI.Infrastructure.Repositories;

public class RankingRepository : IRankingRepository
{
    private readonly ApplicationDbContext _context;

    public RankingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<RankingDto>?> GetRankingAsync(Guid userId)
    {
        if (await _context.Accounts.CountAsync() < 5) return null;

        var fullRanking = _context.Profiles
            .AsNoTracking()
            .Select(p => new RankingDto
            {
                ProfileId = p.Id,
                Email = p.Account.Email,
                Score = p.Exercises.Count(e => e.IsDone),
                Position = -1
            })
            .OrderByDescending(dto => dto.Score)
            .AsEnumerable()
            .Select((dto, i) => new RankingDto()
            {
                ProfileId = dto.ProfileId,
                Email = dto.Email,
                Score = dto.Score,
                Position = i + 1
            })
            .ToList();
        
        var result = fullRanking.Take(5).ToList();
        
        var currentProfile = await _context.Profiles.AsNoTracking().FirstOrDefaultAsync(p => p.AccountId == userId);

        if (result.Exists(x => x.ProfileId == currentProfile.Id))
        {
            Console.WriteLine($"jeden");
            return result;
        }

        var currentUserRanking = fullRanking.FirstOrDefault(u => u.ProfileId == currentProfile.Id);
        result.Add(currentUserRanking);
        
        return result;
    }
}