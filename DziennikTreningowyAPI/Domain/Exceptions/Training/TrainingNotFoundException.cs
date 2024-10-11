namespace DziennikTreningowyAPI.Domain.Exceptions.Training;

public class TrainingNotFoundException : ApiException
{
    public TrainingNotFoundException(Guid trainingId) : base($"Training with ID '{trainingId}' was not found.")
    {
    }
}