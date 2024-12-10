using DziennikTreningowyAPI.Application.DTOs.Account;
using DziennikTreningowyAPI.Application.DTOs.Exercise;
using DziennikTreningowyAPI.Application.DTOs.Profile;
using DziennikTreningowyAPI.Application.DTOs.Training;
using DziennikTreningowyAPI.Domain.Entities;
using Profile = DziennikTreningowyAPI.Domain.Entities.Profile;

namespace DziennikTreningowyAPI.Application.Mappers;

public class AutoMapperProfile : AutoMapper.Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Account, AccountDetailsDto>()
            .ReverseMap();
        CreateMap<Account, AccountRegisterDto>()
            .ReverseMap();
        CreateMap<AccountUpdateDto, Account>()
            .ReverseMap();
        CreateMap<Profile, ProfileDetailsDto>()
            .ReverseMap();
        CreateMap<Profile, ProfileUpdateDto>()
            .ReverseMap();
        CreateMap<Profile, AccountRegisterProfileDto>()
            .ReverseMap();
        CreateMap<Training, TrainingDetailsDto>()
            .ReverseMap();
        CreateMap<Training, TrainingCreateDto>()
            .ReverseMap();
        CreateMap<Training, TrainingUpdateDto>()
            .ReverseMap();
        CreateMap<Exercise, ExerciseDetailsDto>()
            .ReverseMap();
        CreateMap<Exercise, ExerciseCreateDto>()
            .ReverseMap();
        CreateMap<Exercise, ExerciseUpdateDto>()
            .ReverseMap();
    }
}