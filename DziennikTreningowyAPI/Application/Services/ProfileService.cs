using DziennikTreningowyAPI.Application.DTOs.Profile;
using DziennikTreningowyAPI.Domain.Interfaces.Profile;

namespace DziennikTreningowyAPI.Application.Services;

public class ProfileService : IProfileService
{
    public async Task<ProfileDetailsDto> GetByIdAsync(Guid profileId)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<ProfileDetailsDto>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public async Task AddAsync(ProfileDetailsDto profile)
    {
        throw new NotImplementedException();
    }

    public async Task UpdateAsync(ProfileUpdateDto profile)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteAsync(Guid profileId)
    {
        throw new NotImplementedException();
    }
}