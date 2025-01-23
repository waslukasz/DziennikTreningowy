using DziennikTreningowyAPI.Application.DTOs.Exercise;
using DziennikTreningowyAPI.Application.DTOs.Measurment;
using DziennikTreningowyAPI.Application.DTOs.Profile;
using DziennikTreningowyAPI.Application.DTOs.Training;

namespace DziennikTreningowyAPI.Application.DTOs.Sync;

public class SyncDto
{
    public ProfileDetailsDto? Profile { get; set; }
    public IEnumerable<TrainingDetailsDto>? Trainings { get; set; }
    public IEnumerable<ExerciseDetailsDto>? Exercises { get; set; }
    public IEnumerable<MeasurmentDetailsDto>? Measurments { get; set; }
}