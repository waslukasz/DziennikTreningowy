using DziennikTreningowyAPI.Application.DTOs.Ranking;
using DziennikTreningowyAPI.Domain.Interfaces.Ranking;

namespace DziennikTreningowyAPI.Application.Services;

public class RankingService : IRankingService
{
    private readonly IRankingRepository _rankingRepository;

    public RankingService(IRankingRepository rankingRepository)
    {
        _rankingRepository = rankingRepository;
    }

    public async Task<IEnumerable<RankingDto>?> GetRankingAsync(Guid userId)
    {
        return await _rankingRepository.GetRankingAsync(userId);
    }
}