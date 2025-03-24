namespace DziennikTreningowyAPI.Domain.Exceptions.Authorization;

public class InvalidPasswordException : ApiException
{
    public InvalidPasswordException() : base($"Invalid password")
    {
    }
}