using DziennikTreningowyAPI.Domain.Interfaces.Utilities;

namespace DziennikTreningowyAPI.Domain.Interfaces.Account;

public interface IAccountRepository : IGenericRepository<Entities.Account>
{
    Task<Entities.Account?> GetByEmailAsync(string email);
    Task<bool> ExistsByEmailAsync(string email);
}