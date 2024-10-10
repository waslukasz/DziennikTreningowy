using AutoMapper;
using DziennikTreningowyAPI.Application.DTOs.Training;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Exceptions.Training;
using DziennikTreningowyAPI.Domain.Interfaces;

namespace DziennikTreningowyAPI.Application.Services;

public class TrainingService : ITrainingService
{
    private readonly ITrainingRepository _trainingRepository;
    private readonly IMapper _mapper;

    public TrainingService(ITrainingRepository trainingRepository, IMapper mapper)
    {
        _trainingRepository = trainingRepository;
        _mapper = mapper;
    }

    public async Task<TrainingDetailsDto> GetByIdAsync(Guid trainingId)
    {
        if (await _trainingRepository.ExistsAsync(trainingId))
            throw new TrainingNotFoundException(trainingId);

        var training = await _trainingRepository.GetByIdAsync(trainingId);
        return _mapper.Map<TrainingDetailsDto>(training);
    }

    public async Task<IEnumerable<TrainingDetailsDto>> GetAllByUserIdAsync(Guid userId)
    {
        var trainings = await _trainingRepository.GetAllByUserAsync(userId);
        return _mapper.Map<IEnumerable<TrainingDetailsDto>>(trainings);
    }

    public async Task AddTrainingAsync(TrainingCreateDto trainingDto)
    {
        var training = _mapper.Map<Training>(trainingDto);
        training.Id = new Guid();

        await _trainingRepository.AddAsync(training);
    }

    public async Task UpdateTrainingAsync(Guid trainingId, TrainingUpdateDto trainingDto)
    {
        if (await _trainingRepository.ExistsAsync(trainingId))
            throw new TrainingNotFoundException(trainingId);

        var training = await _trainingRepository.GetByIdAsync(trainingId);
        _mapper.Map(trainingDto, training);

        await _trainingRepository.UpdateAsync(training);
    }

    public async Task DeleteTrainingAsync(Guid trainingId)
    {
        if (await _trainingRepository.ExistsAsync(trainingId))
            throw new TrainingNotFoundException(trainingId);

        var training = await _trainingRepository.GetByIdAsync(trainingId);

        await _trainingRepository.DeleteAsync(training);
    }
}