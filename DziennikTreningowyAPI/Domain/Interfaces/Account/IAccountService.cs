using DziennikTreningowyAPI.Application.DTOs.Account;

namespace DziennikTreningowyAPI.Domain.Interfaces.Account;

public interface IAccountService
{
    Task<AccountDetailsDto> GetByIdAsync(Guid accountId);
    Task<AccountDetailsDto> GetByEmailAsync(string email);
    Task<IEnumerable<AccountDetailsDto>> GetAllAsync();
    Task AddAsync(AccountRegisterDto dto);
    Task UpdateAsync(Guid accountId, AccountUpdateDto dto);
    Task DeleteAsync(Guid accountId);
    Task<bool> ExistsAsync(Guid accountId);
    Task<bool> ExistsByEmailAsync(string email);
    Task<(string accessToken, string refreshToken)> AuthenticateAsync(string email, string password);
    Task<(string accessToken, string refreshToken)> RefreshTokens(string refreshToken);
}