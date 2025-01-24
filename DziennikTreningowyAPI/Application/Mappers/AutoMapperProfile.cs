using DziennikTreningowyAPI.Application.DTOs.Account;
using DziennikTreningowyAPI.Application.DTOs.Exercise;
using DziennikTreningowyAPI.Application.DTOs.Measurment;
using DziennikTreningowyAPI.Application.DTOs.Profile;
using DziennikTreningowyAPI.Application.DTOs.Training;
using DziennikTreningowyAPI.Domain.Entities;
using Profile = DziennikTreningowyAPI.Domain.Entities.Profile;

namespace DziennikTreningowyAPI.Application.Mappers;

public class AutoMapperProfile : AutoMapper.Profile
{
    public AutoMapperProfile()
    {
        // Account
        CreateMap<Account, AccountDetailsDto>().ReverseMap();
        CreateMap<Account, AccountRegisterDto>().ReverseMap();
        CreateMap<Account, AccountUpdateDto>().ReverseMap();
        
        // Profile
        CreateMap<Profile, ProfileDetailsDto>().ReverseMap();
        CreateMap<Profile, AccountRegisterProfileDto>().ReverseMap();
        
        // Training
        CreateMap<Training, TrainingDetailsDto>().ReverseMap();
        CreateMap<Training, TrainingSaveDto>().ReverseMap();
        
        // Exercise
        CreateMap<Exercise, ExerciseDetailsDto>().ReverseMap();
        CreateMap<Exercise, ExerciseSaveDto>().ReverseMap();
        
        
        // Measurment
        CreateMap<Measurment, MeasurmentDetailsDto>().ReverseMap();
        CreateMap<Measurment, MeasurmentSaveDto>().ReverseMap();
    }
}