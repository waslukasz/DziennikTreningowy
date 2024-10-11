using DziennikTreningowyAPI.Application.DTOs.User;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface IUserService
{
    Task<UserDetailsDto> GetByIdAsync(Guid userId);
    Task<UserDetailsDto> GetByEmailAsync(string userEmail);
    Task<IEnumerable<UserDetailsDto>> GetAllAsync();
    Task AddUserAsync(UserCreateDto userDto);
    Task UpdateUserAsync(Guid userId, UserUpdateDto userDto);
    Task DeleteUserAsync(Guid userId);
    Task<(string accessToken, string refreshToken)> AuthenticateAsync(string email, string password);
}