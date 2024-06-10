using AutoMapper;
using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Dtos.Training;
using DziennikTreningowyAPI.Models;

namespace DziennikTreningowyAPI.Mappers;

public class AutoMapper : Profile
{
    public AutoMapper()
    {
        CreateMap<Training, TrainingDto>();
        CreateMap<Exercise, ExerciseDto>();
        CreateMap<CreateExerciseRequest, Exercise>();
    }
}