using AutoMapper;
using DziennikTreningowyAPI.Application.DTOs.User;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Exceptions.User;
using DziennikTreningowyAPI.Domain.Interfaces;

namespace DziennikTreningowyAPI.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPasswordHasher _hasher;

    public UserService(IUserRepository userRepository, IMapper mapper, IPasswordHasher hasher)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _hasher = hasher;
    }

    public async Task<UserDetailsDto> GetByIdAsync(Guid userId)
    {
        if (await _userRepository.ExistsAsync(userId))
            throw new UserNotFoundException(userId);

        var user = await _userRepository.GetByIdAsync(userId);
        return _mapper.Map<UserDetailsDto>(user);
    }

    public async Task<UserDetailsDto> GetByEmailAsync(string userEmail)
    {
        if (await _userRepository.ExistsAsync(userEmail))
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
        if (await _userRepository.ExistsAsync(userId))
            throw new UserNotFoundException(userId);

        var user = await _userRepository.GetByIdAsync(userId);
        _mapper.Map(userDto, user);
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepository.UpdateAsync(user);
    }

    public async Task DeleteUserAsync(Guid userId)
    {
        if (await _userRepository.ExistsAsync(userId))
            throw new UserNotFoundException(userId);

        var user = await _userRepository.GetByIdAsync(userId);

        await _userRepository.DeleteAsync(user);
    }

    public async Task AuthenticateAsync(string email, string password)
    {
        throw new NotImplementedException();
    }
}