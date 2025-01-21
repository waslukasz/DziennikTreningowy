using DziennikTreningowyAPI.Application.DTOs.Sync;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces.Account;
using DziennikTreningowyAPI.Domain.Interfaces.Exercise;
using DziennikTreningowyAPI.Domain.Interfaces.Measurment;
using DziennikTreningowyAPI.Domain.Interfaces.Profile;
using DziennikTreningowyAPI.Domain.Interfaces.Training;
using DziennikTreningowyAPI.Domain.Interfaces.Utilities;

namespace DziennikTreningowyAPI.Application.Services;

public class SyncService : ISyncService
{
    private readonly IAccountRepository _accountRepository;
    private readonly IProfileRepository _profileRepository;
    private readonly ITrainingRepository _trainingRepository;
    private readonly IExerciseRepository _exerciseRepository;
    private readonly IMeasurmentRepository _measurmentRepository;

    public SyncService(IAccountRepository accountRepository, IProfileRepository profileRepository, ITrainingRepository trainingRepository, IExerciseRepository exerciseRepository, IMeasurmentRepository measurmentRepository)
    {
        _accountRepository = accountRepository;
        _profileRepository = profileRepository;
        _trainingRepository = trainingRepository;
        _exerciseRepository = exerciseRepository;
        _measurmentRepository = measurmentRepository;
    }

    public async Task<SyncDto> SynchronizeDataAsync(Guid accountId)
    {
        SyncDto dto = new SyncDto();
        dto.Account = await _accountRepository.GetByIdAsync(accountId);
        dto.Profile = await _profileRepository.GetByAccountIdAsync(accountId);
        dto.Trainings = await _trainingRepository.GetAllByProfileAsync(dto.Profile.Id);
        dto.Exercises = await _exerciseRepository.GetAllByProfileAsync(dto.Profile.Id);
        dto.Measurments = await _measurmentRepository.GetAllByProfileAsync(dto.Profile.Id);

        return dto;
    }

    public async Task<SyncDto> SynchronizeDataAsync(Guid accountId, DateTime lastSync)
    {
        SyncDto dto = new SyncDto();
        var account = await _accountRepository.GetByIdAsync(accountId);
        var profile = await _profileRepository.GetByAccountIdAsync(accountId);
        var trainings = await _trainingRepository.GetAllByProfileAsync(profile.Id);
        var exercises = await _exerciseRepository.GetAllByProfileAsync(profile.Id);
        var measurments = await _measurmentRepository.GetAllByProfileAsync(profile.Id);
        
        if (account.UpdatedAt > lastSync) dto.Account = account;
        if (profile.UpdatedAt > lastSync) dto.Profile = profile;
        dto.Trainings = trainings.Where(t => t.UpdatedAt > lastSync).ToList();
        dto.Exercises = exercises.Where(t => t.UpdatedAt > lastSync).ToList();
        dto.Measurments = measurments.Where(t => t.UpdatedAt > lastSync).ToList();

        return dto;
    }

    public async Task SaveDataAsync(Guid accountId, SyncDto dto)
    {
        if (dto.Account != null) await _accountRepository.UpdateAsync(dto.Account);
        if (dto.Profile != null) await _profileRepository.UpdateAsync(dto.Profile);
        if (dto.Trainings != null)
            foreach (var training in dto.Trainings)
            {
                await _trainingRepository.UpdateAsync(training);
            }
        if (dto.Exercises != null)
            foreach (var exercise in dto.Exercises)
            {
                await _exerciseRepository.UpdateAsync(exercise);
            }
        if (dto.Measurments != null)
            foreach (var measurment in dto.Measurments)
            {
                await _measurmentRepository.UpdateAsync(measurment);
            }
    }
}