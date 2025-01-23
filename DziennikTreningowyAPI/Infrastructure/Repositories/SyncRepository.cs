using System.Net;
using AutoMapper;
using DziennikTreningowyAPI.Application.DTOs.Exercise;
using DziennikTreningowyAPI.Application.DTOs.Measurment;
using DziennikTreningowyAPI.Application.DTOs.Profile;
using DziennikTreningowyAPI.Application.DTOs.Sync;
using DziennikTreningowyAPI.Application.DTOs.Training;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces.Utilities;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Profile = AutoMapper.Profile;

namespace DziennikTreningowyAPI.Infrastructure.Repositories;

public class SyncRepository : ISyncRepository
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public SyncRepository(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<SyncDto> GetDataAsync(Guid accountId, DateTime? lastSync)
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync(x => x.AccountId == accountId);
        var trainings = await _context.Trainings.Where(x => x.ProfileId == profile.Id && (lastSync == null || lastSync < x.UpdatedAt )).ToListAsync();
        var exercises = await _context.Exercises.Where(x => x.ProfileId == profile.Id && (lastSync == null || lastSync < x.UpdatedAt )).ToListAsync();
        var measurments = await _context.Measurments.Where(x => x.ProfileId == profile.Id && (lastSync == null || lastSync < x.UpdatedAt )).ToListAsync();

        var result = new SyncDto()
        {
            Profile = _mapper.Map<ProfileDetailsDto>(profile),
            Trainings = _mapper.Map<IEnumerable<TrainingDetailsDto>>(trainings),
            Exercises = _mapper.Map<IEnumerable<ExerciseDetailsDto>>(exercises),
            Measurments = _mapper.Map<IEnumerable<MeasurmentDetailsDto>>(measurments)
        };
        
        return result;
    }

    public async Task SaveDataAsync(Guid accountId, SyncDto syncDto)
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync(x => x.AccountId == accountId);

        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                if (syncDto.Profile != null)
                {
                    _mapper.Map(syncDto.Profile, profile);
                    await _context.SaveChangesAsync();
                }
                
                if (syncDto.Trainings != null)
                {
                    var existingTrainings = await _context.Trainings
                        .Where(x => x.ProfileId == profile.Id).ToListAsync();

                    foreach (var trainingDto in syncDto.Trainings)
                    {
                        var existingTraining = existingTrainings.FirstOrDefault(x => x.Id == trainingDto.Id);
                        if (existingTraining != null) _mapper.Map(trainingDto, existingTraining);
                        else _context.Trainings.Add(_mapper.Map<Training>(trainingDto));

                        await _context.SaveChangesAsync();
                    }
                }

                if (syncDto.Exercises != null)
                {
                    var existingExercises = await _context.Exercises
                        .Where(x => x.ProfileId == profile.Id).ToListAsync();
                    
                    foreach (var exerciseDto in syncDto.Exercises)
                    {
                        var existingExercise = existingExercises.FirstOrDefault(x => x.Id == exerciseDto.Id);
                        if (existingExercise != null) _mapper.Map(exerciseDto, existingExercise);
                        else _context.Exercises.Add(_mapper.Map<Exercise>(exerciseDto));

                        await _context.SaveChangesAsync();
                    }
                }

                if (syncDto.Measurments != null)
                {
                    var existingMeasurments = await _context.Measurments
                        .Where(x => x.ProfileId == profile.Id).ToListAsync();
                    
                    foreach (var measurmentDto in syncDto.Measurments)
                    {
                        var existingMeasurment = existingMeasurments.FirstOrDefault(x => x.Id == measurmentDto.Id);
                        if (existingMeasurment != null) _mapper.Map(measurmentDto, existingMeasurment);
                        else _context.Measurments.Add(_mapper.Map<Measurment>(measurmentDto));

                        await _context.SaveChangesAsync();
                    }
                }
                
                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}