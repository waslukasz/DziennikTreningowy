namespace DziennikTreningowyAPI.Domain.Exceptions.Account;

public class AccountExistsException : ApiException
{
    public AccountExistsException() : base($"That email is already connected to an account")
    {
    }
}