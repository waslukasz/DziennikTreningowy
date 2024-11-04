namespace DziennikTreningowyAPI.Domain.Exceptions.Authorization;

public class InvalidRefreshTokenException : ApiException
{
    public InvalidRefreshTokenException() : base($"Refresh token is invalid.")
    {
    }
}