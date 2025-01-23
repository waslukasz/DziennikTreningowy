using DziennikTreningowyAPI.Application.DTOs.Sync;

namespace DziennikTreningowyAPI.Domain.Interfaces.Utilities;

public interface ISyncRepository
{
    public Task<SyncDto> GetDataAsync(Guid accountId, DateTime? lastSync);
}