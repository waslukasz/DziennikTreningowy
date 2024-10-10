using DziennikTreningowyAPI.Domain.Entities;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface IUserRepository
{
    Task<User> GetByIdAsync(Guid userId);
    Task<IEnumerable<User>> GetAllAsync();
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(Guid userId);
    Task<User> GetByEmailAsync(string email);
}