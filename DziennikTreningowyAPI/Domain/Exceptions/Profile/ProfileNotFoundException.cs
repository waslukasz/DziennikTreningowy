namespace DziennikTreningowyAPI.Domain.Exceptions.Profile;

public class ProfileNotFoundException : ApiException
{
    public ProfileNotFoundException(Guid profileId) : base($"Profile with ID '{profileId}' was not found.")
    {
    }
}