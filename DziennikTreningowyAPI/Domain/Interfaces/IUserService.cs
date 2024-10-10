using DziennikTreningowyAPI.Application.DTOs.User;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface IUserService
{
    Task<UserDetailsDto> GetByIdAsync(Guid userId);
    Task<IEnumerable<UserDetailsDto>> GetAllAsync();
    Task AddUserAsync(UserCreateDto userDto);
    Task UpdateUserAsync(Guid userId, UserUpdateDto userDto);
    Task DeleteUserAsync(Guid userId);
    Task AuthenticateAsync(string email, string password);
}