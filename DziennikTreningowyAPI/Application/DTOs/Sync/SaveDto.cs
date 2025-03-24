using DziennikTreningowyAPI.Application.DTOs.Exercise;
using DziennikTreningowyAPI.Application.DTOs.Measurement;
using DziennikTreningowyAPI.Application.DTOs.Profile;
using DziennikTreningowyAPI.Application.DTOs.Training;

namespace DziennikTreningowyAPI.Application.DTOs.Sync;

public class SaveDto
{
    public ProfileSaveDto? Profile { get; set; }
    public IEnumerable<TrainingSaveDto>? Trainings { get; set; }
    public IEnumerable<ExerciseSaveDto>? Exercises { get; set; }
    public IEnumerable<MeasurementSaveDto>? Measurements { get; set; }
    public IEnumerable<ToDeleteDto>? ToDelete { get; set; }
}