/*using AutoMapper;
using DziennikTreningowyAPI.Application.DTOs.User;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Exceptions.Authorization;
using DziennikTreningowyAPI.Domain.Exceptions.User;
using DziennikTreningowyAPI.Domain.Interfaces;

namespace DziennikTreningowyAPI.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher _hasher;
    private readonly IJwtTokenManager _tokenManager;

    public UserService(IUserRepository userRepository, IMapper mapper, IPasswordHasher hasher, IJwtTokenManager tokenManager)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _hasher = hasher;
        _tokenManager = tokenManager;
    }

    public async Task<UserDetailsDto> GetByIdAsync(Guid userId)
    {
        if (!await _userRepository.ExistsAsync(userId))
            throw new UserNotFoundException(userId);

        var user = await _userRepository.GetByIdAsync(userId);
        return _mapper.Map<UserDetailsDto>(user);
    }

    public async Task<UserDetailsDto> GetByEmailAsync(string userEmail)
    {
        if (!await _userRepository.ExistsAsync(userEmail))
            throw new UserNotFoundException(userEmail);

        var user = await _userRepository.GetByEmailAsync(userEmail);
        return _mapper.Map<UserDetailsDto>(user);
    }

    public async Task<IEnumerable<UserDetailsDto>> GetAllAsync()
    {
        var users = await _userRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<UserDetailsDto>>(users);
    }

    public async Task AddUserAsync(UserCreateDto userDto)
    {
        var user = _mapper.Map<User>(userDto);
        user.Id = new Guid();
        user.CreatedAt = DateTime.UtcNow;
        user.PasswordHash = _hasher.HashPassword(userDto.Password);

        await _userRepository.AddAsync(user);
    }

    public async Task UpdateUserAsync(Guid userId, UserUpdateDto userDto)
    {
        if (!await _userRepository.ExistsAsync(userId))
            throw new UserNotFoundException(userId);

        var user = await _userRepository.GetByIdAsync(userId);
        _mapper.Map(userDto, user);
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepository.UpdateAsync(user);
    }

    public async Task DeleteUserAsync(Guid userId)
    {
        if (!await _userRepository.ExistsAsync(userId))
            throw new UserNotFoundException(userId);

        var user = await _userRepository.GetByIdAsync(userId);

        await _userRepository.DeleteAsync(user);
    }

    public async Task<(string accessToken, string refreshToken)> AuthenticateAsync(string email, string password)
    {
        var user = await _userRepository.GetByEmailAsync(email);

        if (user == null) throw new UserNotFoundException(email);

        bool isPasswordValid = _hasher.VerifyPassword(password, user.PasswordHash);
        if (!isPasswordValid) throw new InvalidPasswordException();

        var accessToken = _tokenManager.GenerateAccessToken(user.Id, user.Email);
        var refreshToken = _tokenManager.GenerateRefreshToken(user.Id, user.Email);

        return (accessToken, refreshToken.Token);
    }

    public (string accessToken, string refreshToken) RefreshTokens(string refreshToken)
    {
        var tokens =  _tokenManager.RefreshTokens(refreshToken);
        
        if (tokens == null) throw new InvalidRefreshTokenException();

        return (tokens.Value.accessToken, tokens.Value.refreshToken.Token);
    }
}*/