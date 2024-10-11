using System.Security.Claims;
using DziennikTreningowyAPI.Domain.Interfaces;
using DziennikTreningowyAPI.Infrastructure.Configurations;
using Microsoft.Extensions.Options;

namespace DziennikTreningowyAPI.Utilities;

public class JwtTokenManager : IJwtTokenManager
{
    private readonly JwtSettings _jwtSettings;

    public JwtTokenManager(IOptions<JwtSettings> jwtSettings)
    {
        _jwtSettings = jwtSettings.Value;
    }

    public string GenerateToken(Guid userId, string email, string username)
    {
        throw new NotImplementedException();
    }

    public ClaimsPrincipal? ValidateToken(string token)
    {
        throw new NotImplementedException();
    }
}