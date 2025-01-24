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

    public async Task SaveDataAsync(Guid accountId, SaveDto dto)
    {
        var profile = await _context.Profiles.FirstOrDefaultAsync(x => x.AccountId == accountId);

        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                if (dto.Profile != null)
                {
                    _mapper.Map(dto.Profile, profile);
                    await _context.SaveChangesAsync();
                }
                
                if (dto.Trainings != null)
                {
                    var existingTrainings = await _context.Trainings
                        .Where(x => x.ProfileId == profile.Id).AsNoTracking().ToListAsync();

                    foreach (var trainingDto in dto.Trainings)
                    {
                        var existingTraining = existingTrainings.FirstOrDefault(x => x.Id == trainingDto.Id);
                        var result = existingTraining ?? _mapper.Map<Training>(trainingDto);

                        if (existingTraining != null)
                        {
                            _context.Trainings.Update(result);
                        }
                        else
                        {
                            result.ProfileId = profile.Id;
                            await _context.Trainings.AddAsync(result);
                        }
                        
                        await _context.SaveChangesAsync();
                    }
                }

                if (dto.Exercises != null)
                {
                    var existingExercises = await _context.Exercises
                        .Where(x => x.ProfileId == profile.Id).AsNoTracking().ToListAsync();
                    
                    foreach (var exerciseDto in dto.Exercises)
                    {
                        var existingExercise = existingExercises.FirstOrDefault(x => x.Id == exerciseDto.Id);
                        var result = existingExercise ?? _mapper.Map<Exercise>(exerciseDto);

                        if (existingExercise != null)
                        {
                            _context.Exercises.Update(result);
                        }
                        else
                        {
                            result.ProfileId = profile.Id;
                            await _context.Exercises.AddAsync(result);
                        }

                        await _context.SaveChangesAsync();
                    }
                }

                if (dto.Measurments != null)
                {
                    var existingMeasurments = await _context.Measurments
                        .Where(x => x.ProfileId == profile.Id).AsNoTracking().ToListAsync();
                    
                    foreach (var measurmentDto in dto.Measurments)
                    {
                        var existingMeasurment = existingMeasurments.FirstOrDefault(x => x.Id == measurmentDto.Id);
                        var result = existingMeasurment ?? _mapper.Map<Measurment>(measurmentDto);

                        if (existingMeasurment != null)
                        {
                            _context.Measurments.Update(result);
                        }
                        else
                        {
                            result.ProfileId = profile.Id;
                            await _context.Measurments.AddAsync(result);
                        }

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