using AutoMapper;
using DziennikTreningowyAPI.Application.DTOs.Exercise;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Exceptions.Exercise;
using DziennikTreningowyAPI.Domain.Interfaces;
using DziennikTreningowyAPI.Domain.Interfaces.Exercise;

namespace DziennikTreningowyAPI.Application.Services;

public class ExerciseService : IExerciseService
{
    private readonly IExerciseRepository _exerciseRepository;
    private readonly IMapper _mapper;

    public ExerciseService(IExerciseRepository exerciseRepository, IMapper mapper)
    {
        _exerciseRepository = exerciseRepository;
        _mapper = mapper;
    }

    public async Task<ExerciseDetailsDto> GetByIdAsync(Guid exerciseId)
    {
        if (await _exerciseRepository.ExistsAsync(exerciseId))
            throw new ExerciseNotFoundException(exerciseId);

        var exercise = await _exerciseRepository.GetByIdAsync(exerciseId);
        return _mapper.Map<ExerciseDetailsDto>(exercise);
    }

    public async Task<IEnumerable<ExerciseDetailsDto>> GetAllByTrainingIdAsync(Guid trainingId)
    {
        var exercises = await _exerciseRepository.GetAllByTrainingIdAsync(trainingId);
        return _mapper.Map<IEnumerable<ExerciseDetailsDto>>(exercises);
    }

    public async Task AddAsync(ExerciseCreateDto exerciseDto)
    {
        var exercise = _mapper.Map<Exercise>(exerciseDto);
        exercise.Id = new Guid();

        await _exerciseRepository.AddAsync(exercise);
    }

    public async Task UpdateAsync(ExerciseUpdateDto dto)
    {
        if (await _exerciseRepository.ExistsAsync(dto.Id))
            throw new ExerciseNotFoundException(dto.Id);

        var exercise = await _exerciseRepository.GetByIdAsync(dto.Id);
        _mapper.Map(dto, exercise);

        await _exerciseRepository.UpdateAsync(exercise);
    }

    public async Task DeleteAsync(Guid exerciseId)
    {
        if (await _exerciseRepository.ExistsAsync(exerciseId))
            throw new ExerciseNotFoundException(exerciseId);

        var exercise = await _exerciseRepository.GetByIdAsync(exerciseId);

        await _exerciseRepository.DeleteAsync(exercise);
    }
}