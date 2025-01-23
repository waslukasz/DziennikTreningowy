using AutoMapper;
using DziennikTreningowyAPI.Application.DTOs.Exercise;
using DziennikTreningowyAPI.Application.DTOs.Measurment;
using DziennikTreningowyAPI.Application.DTOs.Profile;
using DziennikTreningowyAPI.Application.DTOs.Sync;
using DziennikTreningowyAPI.Application.DTOs.Training;
using DziennikTreningowyAPI.Domain.Interfaces.Utilities;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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
}