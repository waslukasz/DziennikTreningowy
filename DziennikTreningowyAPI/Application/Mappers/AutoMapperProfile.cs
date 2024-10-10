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
        CreateMap<User, UserDetailsDto>().ReverseMap();
        CreateMap<User, UserCreateDto>().ReverseMap();
        CreateMap<User, UserUpdateDto>().ReverseMap();
        CreateMap<Training, TrainingDetailsDto>().ReverseMap();
        CreateMap<Training, TrainingCreateDto>().ReverseMap();
        CreateMap<Training, TrainingUpdateDto>().ReverseMap();
        CreateMap<Exercise, ExerciseDetailsDto>().ReverseMap();
        CreateMap<Exercise, ExerciseCreateDto>().ReverseMap();
        CreateMap<Exercise, ExerciseUpdateDto>().ReverseMap();
    }
}