using AutoMapper;
using DziennikTreningowyAPI.Application.DTOs.Profile;
using DziennikTreningowyAPI.Domain.Exceptions.Profile;
using DziennikTreningowyAPI.Domain.Interfaces.Profile;

namespace DziennikTreningowyAPI.Application.Services;

public class ProfileService : IProfileService
{
    private readonly IProfileRepository _profileRepository;
    private readonly IMapper _mapper;

    public ProfileService(IProfileRepository profileRepository, IMapper mapper)
    {
        _profileRepository = profileRepository;
        _mapper = mapper;
    }

    public async Task<ProfileDetailsDto> GetByIdAsync(Guid profileId)
    {
        if (!await _profileRepository.ExistsAsync(profileId))
            throw new ProfileNotFoundException(profileId);
        
        var profile = _mapper.Map<ProfileDetailsDto>(await _profileRepository.GetByIdAsync(profileId));
        return _mapper.Map<ProfileDetailsDto>(profile);
    }

    public async Task<IEnumerable<ProfileDetailsDto>> GetAllAsync()
    {
        var profiles = await _profileRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<ProfileDetailsDto>>(profiles);
    }

    /*public async Task AddAsync(ProfileCreateDto profile)
    {
        throw new NotImplementedException();
    }

    public async Task UpdateAsync(ProfileUpdateDto profile)
    {
        throw new NotImplementedException();
    }*/

    public async Task DeleteAsync(Guid profileId)
    {
        throw new NotImplementedException();
    }
}