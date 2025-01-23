using DziennikTreningowyAPI.Application.DTOs.Profile;

namespace DziennikTreningowyAPI.Domain.Interfaces.Profile;

public interface IProfileService
{
    Task<ProfileDetailsDto> GetByIdAsync(Guid profileId);
    Task<IEnumerable<ProfileDetailsDto>> GetAllAsync();
    /*Task AddAsync(ProfileCreateDto profile);
    Task UpdateAsync(ProfileUpdateDto profile);*/
    Task DeleteAsync(Guid profileId);
}