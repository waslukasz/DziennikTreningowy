using AutoMapper;
using DziennikTreningowyAPI.Application.DTOs.Exercise;
using DziennikTreningowyAPI.Application.DTOs.Training;
using DziennikTreningowyAPI.Application.DTOs.User;
using DziennikTreningowyAPI.Domain.Entities;

namespace DziennikTreningowyAPI.Application.Mappers;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<User, UserDetailsDto>();
        CreateMap<User, UserCreateDto>();
        CreateMap<User, UserUpdateDto>();
        CreateMap<Training, TrainingDetailsDto>();
        CreateMap<Training, TrainingCreateDto>();
        CreateMap<Training, TrainingUpdateDto>();
        CreateMap<Exercise, ExerciseDetailsDto>();
        CreateMap<Exercise, ExerciseCreateDto>();
        CreateMap<Exercise, ExerciseUpdateDto>();
    }
}