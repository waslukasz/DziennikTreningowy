using DziennikTreningowyAPI.Application.DTOs.Ranking;

namespace DziennikTreningowyAPI.Domain.Interfaces.Ranking;

public interface IRankingService
{
    Task<IEnumerable<RankingDto>?> GetRankingAsync(Guid userId);
}