using AutoMapper;
using DziennikTreningowyAPI.Application.DTOs.Account;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Exceptions.Account;
using DziennikTreningowyAPI.Domain.Exceptions.Authorization;
using DziennikTreningowyAPI.Domain.Interfaces;
using DziennikTreningowyAPI.Domain.Interfaces.Account;
using Profile = DziennikTreningowyAPI.Domain.Entities.Profile;

namespace DziennikTreningowyAPI.Application.Services;

public class AccountService : IAccountService
{
    private readonly IAccountRepository _accountRepository;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher _hasher;
    private readonly IJwtTokenManager _tokenManager;

    public AccountService(IAccountRepository accountRepository, IMapper mapper, IPasswordHasher hasher, IJwtTokenManager tokenManager)
    {
        _accountRepository = accountRepository;
        _mapper = mapper;
        _hasher = hasher;
        _tokenManager = tokenManager;
    }

    public async Task<AccountDetailsDto> GetByIdAsync(Guid accountId)
    {
        var account = await _accountRepository.GetByIdAsync(accountId);
        
        if (account == null)
            throw new AccountNotFoundException(accountId);
        
        return _mapper.Map<AccountDetailsDto>(account);
    }

    public async Task<AccountDetailsDto> GetByEmailAsync(string email)
    {
        if (!await _accountRepository.ExistsByEmailAsync(email))
            throw new AccountNotFoundException(email);
        
        var user = await _accountRepository.GetByEmailAsync(email);
        return _mapper.Map<AccountDetailsDto>(user);
    }

    public async Task<IEnumerable<AccountDetailsDto>> GetAllAsync()
    {
        var accounts = await _accountRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<AccountDetailsDto>>(accounts);
    }

    public async Task AddAsync(AccountRegisterDto dto)
    {
        if (await _accountRepository.ExistsByEmailAsync(dto.Email))
            throw new AccountExistsException();
        
        var account = _mapper.Map<Account>(dto);
        account.PasswordHash = _hasher.HashPassword(dto.Password);

        var profile = new Profile();
        
        if (dto.Profile != null) _mapper.Map(dto.Profile, profile);
        profile.AccountId = account.Id;
        account.Profile = profile;

        await _accountRepository.AddAsync(account);
    }

    public async Task UpdateAsync(Guid accountId, AccountUpdateDto dto)
    {
        var account = await _accountRepository.GetByIdAsync(accountId);
        
        if (account == null)
            throw new AccountNotFoundException(accountId);

        if (dto.NewEmail == null && dto.NewPassword == null)
            throw new ArgumentException("You must provide at least 1 field to update");
        
        if (!_hasher.VerifyPassword(dto.CurrentPassword, account.PasswordHash))
            throw new InvalidPasswordException();
        
        if (dto.NewEmail != null)
            account.Email = dto.NewEmail;
        
        if (dto.NewPassword != null)
        {
            if (_hasher.VerifyPassword(dto.NewPassword, account.PasswordHash))
                throw new AccountUpdateException("New password cannot be same as current password");

            account.PasswordHash = _hasher.HashPassword(dto.NewPassword);
        }
        
        await _accountRepository.UpdateAsync(account);
    }

    public async Task DeleteAsync(Guid accountId)
    {
        var account = await _accountRepository.GetByIdAsync(accountId);
        
        if (account == null)
            throw new AccountNotFoundException(accountId);
        
        await _accountRepository.DeleteAsync(account);
    }

    public async Task<bool> ExistsAsync(Guid accountId)
    {
        return await _accountRepository.ExistsAsync(accountId);
    }

    public async Task<bool> ExistsByEmailAsync(string email)
    {
        return await _accountRepository.ExistsByEmailAsync(email);
    }

    public async Task<(string accessToken, string refreshToken)> AuthenticateAsync(string email, string password)
    {
        /*
            TODO: Finish tokens functionality.
            Make service that removes revoked/expired tokens once a day.
        */
        var account = await _accountRepository.GetByEmailAsync(email);
        
        if (account == null)
            throw new AccountNotFoundException(email);

        bool isPasswordValid = _hasher.VerifyPassword(password, account.PasswordHash);
        if (!isPasswordValid)
            throw new InvalidPasswordException();
        
        var accessToken = _tokenManager.GenerateAccessToken(account.Id);
        var refreshToken = await _tokenManager.GenerateRefreshTokenAsync(account.Id);
        
        return (accessToken, refreshToken.Token);
    }

    public async Task<(string accessToken, string refreshToken)> RefreshTokens(string refreshToken)
    {
        var tokens = await _tokenManager.RefreshTokensAsync(refreshToken);
        
        if (tokens == null)
            throw new InvalidRefreshTokenException();
        
        return (tokens.Value.accessToken, tokens.Value.refreshToken.Token);
    }
}