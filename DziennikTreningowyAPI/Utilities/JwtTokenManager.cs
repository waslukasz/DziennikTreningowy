using System.IdentityModel.Tokens.Jwt;
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

    public (string AccessToken, string RefreshToken) GenerateTokens(Guid userId, string email)
    {
        throw new NotImplementedException();
    }

    public ClaimsPrincipal? ValidateToken(string token)
    {
        throw new NotImplementedException();
    }

    public string GenerateRefreshToken()
    {
        throw new NotImplementedException();
    }

    public bool ValidateRefreshToken(Guid userId, string refreshToken)
    {
        throw new NotImplementedException();
    }

    public (string AccessToken, string RefreshToken)? RefreshTokens(string refreshToken)
    {
        throw new NotImplementedException();
    }
}