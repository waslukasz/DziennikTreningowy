namespace DziennikTreningowyAPI.Domain.Exceptions.User;

public class UserNotFoundException : Exception
{
    public UserNotFoundException(Guid userId) : base($"User with ID '{userId}' was not found.")
    {
    }
    
    public UserNotFoundException(string userEmail) : base($"User with email address '{userEmail}' was not found.")
    {
    }
}