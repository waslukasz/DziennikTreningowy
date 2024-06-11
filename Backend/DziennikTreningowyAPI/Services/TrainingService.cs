using AutoMapper;
using DziennikTreningowyAPI.Dtos.Training;
using DziennikTreningowyAPI.Models;
using DziennikTreningowyAPI.Repositories;

namespace DziennikTreningowyAPI.Services;

public interface ITrainingService
{
    Task<List<TrainingDto>> GetAllAsync();
    Task<TrainingDto?> GetByIdAsync(int id);
    Task<TrainingDto> CreateAsync();
    Task<TrainingDto?> DeleteAsync(int id);
}

public class TrainingService(IMapper mapper, ITrainingRepository trainingRepository) : ITrainingService
{
    public async Task<List<TrainingDto>> GetAllAsync()
    {
        List<Training> trainings = await trainingRepository.GetAllAsync();
        List<TrainingDto> trainingDtos = mapper.Map<List<TrainingDto>>(trainings);
        return trainingDtos;
    }

    public async Task<TrainingDto?> GetByIdAsync(int id)
    {
        Training? training = await trainingRepository.GetByIdAsync(id);
        TrainingDto? trainingDto = mapper.Map<TrainingDto>(training);
        return trainingDto;
    }

    public async Task<TrainingDto> CreateAsync()
    {
        Training training = await trainingRepository.CreateAsync(new Training());
        TrainingDto trainingDto = mapper.Map<TrainingDto>(training);
        return trainingDto;
    }

    public async Task<TrainingDto?> DeleteAsync(int id)
    {
        Training? training = await trainingRepository.DeleteAsync(id);
        TrainingDto? trainingDto = mapper.Map<TrainingDto>(training);
        return trainingDto;
    }
}