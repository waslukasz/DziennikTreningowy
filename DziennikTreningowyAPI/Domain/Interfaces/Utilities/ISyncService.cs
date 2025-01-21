using DziennikTreningowyAPI.Application.DTOs.Sync;

namespace DziennikTreningowyAPI.Domain.Interfaces.Utilities;

public interface ISyncService
{
    public Task<SyncDto> SynchronizeDataAsync(Guid accountId);
    public Task<SyncDto> SynchronizeDataAsync(Guid accountId, DateTime lastSync);
    public Task SaveDataAsync(Guid accountId, SyncDto dto);
}