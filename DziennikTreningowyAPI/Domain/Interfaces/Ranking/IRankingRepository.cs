using DziennikTreningowyAPI.Application.DTOs.Ranking;

namespace DziennikTreningowyAPI.Domain.Interfaces.Ranking;

public interface IRankingRepository
{
    Task<IEnumerable<RankingDto>?> GetRankingAsync(Guid userId);
}