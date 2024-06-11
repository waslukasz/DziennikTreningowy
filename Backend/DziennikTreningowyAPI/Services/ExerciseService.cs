using AutoMapper;
using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Models;
using DziennikTreningowyAPI.Repositories;

namespace DziennikTreningowyAPI.Services;

public interface IExerciseService
{
    Task<List<ExerciseDto>> GetAllAsync();
    Task<ExerciseDto?> GetByIdAsync(int id);
    Task<ExerciseDto> CreateAsync(CreateExerciseRequestDto request);
    Task<ExerciseDto?> UpdateAsync(int id, UpdateExerciseRequestDto request);
    Task<ExerciseDto?> DeleteAsync(int id);
}

public class ExerciseService(IMapper mapper, IExerciseRepository exerciseRepository) : IExerciseService
{
    public async Task<List<ExerciseDto>> GetAllAsync()
    {
        List<Exercise> exercises = await exerciseRepository.GetAllAsync();
        List<ExerciseDto> exerciseDtos = mapper.Map<List<ExerciseDto>>(exercises);
        return exerciseDtos;
    }

    public async Task<ExerciseDto?> GetByIdAsync(int id)
    {
        Exercise? exercise = await exerciseRepository.GetByIdAsync(id);
        ExerciseDto exerciseDto = mapper.Map<ExerciseDto>(exercise);
        return exerciseDto;
    }

    public async Task<ExerciseDto> CreateAsync(CreateExerciseRequestDto request)
    {
        Exercise exercise = mapper.Map<CreateExerciseRequestDto, Exercise>(request);
        await exerciseRepository.CreateAsync(exercise);
        ExerciseDto exerciseDto = mapper.Map<ExerciseDto>(exercise);
        return exerciseDto;
    }

    public async Task<ExerciseDto?> UpdateAsync(int id, UpdateExerciseRequestDto request)
    {
        Exercise? exercise = await exerciseRepository.UpdateAsync(id, request);
        ExerciseDto? exerciseDto = mapper.Map<ExerciseDto>(exercise);
        return exerciseDto;
    }

    public async Task<ExerciseDto?> DeleteAsync(int id)
    {
        Exercise? exercise = await exerciseRepository.DeleteAsync(id);
        ExerciseDto? exerciseDto = mapper.Map<ExerciseDto>(exercise);
        return exerciseDto;
    }
}