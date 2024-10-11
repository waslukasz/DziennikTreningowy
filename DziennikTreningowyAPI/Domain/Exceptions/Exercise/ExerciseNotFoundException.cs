namespace DziennikTreningowyAPI.Domain.Exceptions.Exercise;

public class ExerciseNotFoundException : ApiException
{
    public ExerciseNotFoundException(Guid exerciseId) : base($"Exercise with ID '{exerciseId}' was not found.")
    {
    }
}