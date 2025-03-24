using DziennikTreningowyAPI.Application.DTOs.Exercise;
using DziennikTreningowyAPI.Application.DTOs.Measurement;
using DziennikTreningowyAPI.Application.DTOs.Profile;
using DziennikTreningowyAPI.Application.DTOs.Training;

namespace DziennikTreningowyAPI.Application.DTOs.Sync;

public class SyncDto
{
    public ProfileDetailsDto? Profile { get; set; }
    public IEnumerable<TrainingDetailsDto>? Trainings { get; set; }
    public IEnumerable<ExerciseDetailsDto>? Exercises { get; set; }
    public IEnumerable<MeasurementDetailsDto>? Measurements { get; set; }
}