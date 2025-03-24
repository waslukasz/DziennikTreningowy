namespace DziennikTreningowyAPI.Domain.Exceptions.Account;

public class AccountUpdateException : ApiException
{
    public AccountUpdateException(string message) : base(message)
    {
    }
}