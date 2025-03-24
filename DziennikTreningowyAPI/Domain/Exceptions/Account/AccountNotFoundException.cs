namespace DziennikTreningowyAPI.Domain.Exceptions.Account;

public class AccountNotFoundException : ApiException
{
    public AccountNotFoundException(Guid id) : base($"User with ID '{id}' was not found.")
    {
    }
    
    public AccountNotFoundException(string email) : base($"User with email address '{email}' was not found.")
    {
    }
}