using DziennikTreningowyAPI.Application.DTOs.Sync;

namespace DziennikTreningowyAPI.Domain.Interfaces.Utilities;

public interface ISyncService
{
    public Task<SyncDto> SyncDataAsync(Guid accountId, DateTime? lastSync);
    public Task SaveDataAsync(Guid accountId, SaveDto dto);
}