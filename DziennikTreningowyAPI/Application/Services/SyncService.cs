using DziennikTreningowyAPI.Application.DTOs.Sync;
using DziennikTreningowyAPI.Domain.Interfaces.Utilities;

namespace DziennikTreningowyAPI.Application.Services;

public class SyncService : ISyncService
{
    private readonly ISyncRepository _syncRepository;

    public SyncService(ISyncRepository syncRepository)
    {
        _syncRepository = syncRepository;
    }

    public async Task<SyncDto> SyncDataAsync(Guid accountId, DateTime? lastSync)
    {
        return await _syncRepository.GetDataAsync(accountId, lastSync);
    }

    public async Task SaveDataAsync(Guid accountId, SaveDto dto)
    {
        await _syncRepository.SaveDataAsync(accountId, dto);
    }
}