using DziennikTreningowyAPI.Domain.Interfaces.Utilities;

namespace DziennikTreningowyAPI.Domain.Interfaces.Profile;

public interface IProfileRepository : IGenericRepository<Entities.Profile>
{
    Task<Entities.Profile?> GetByAccountIdAsync(Guid accountId);
}