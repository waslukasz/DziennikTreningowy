using DziennikTreningowyAPI.Application.DTOs.Sync;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces.Account;
using DziennikTreningowyAPI.Domain.Interfaces.Exercise;
using DziennikTreningowyAPI.Domain.Interfaces.Measurment;
using DziennikTreningowyAPI.Domain.Interfaces.Profile;
using DziennikTreningowyAPI.Domain.Interfaces.Training;
using DziennikTreningowyAPI.Domain.Interfaces.Utilities;
using DziennikTreningowyAPI.Infrastructure.Data;

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