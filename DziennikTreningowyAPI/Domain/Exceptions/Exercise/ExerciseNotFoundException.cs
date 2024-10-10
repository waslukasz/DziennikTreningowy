namespace DziennikTreningowyAPI.Domain.Exceptions.Exercise;

public class ExerciseNotFoundException : Exception
{
    public ExerciseNotFoundException(Guid exerciseId) : base($"Exercise with ID '{exerciseId}' was not found.")
    {
    }
}