using System.Security.Claims;
using DziennikTreningowyAPI.Domain.Entities;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface IJwtTokenManager
{
    string GenerateAccessToken(Guid userId, string email);
    RefreshToken GenerateRefreshToken(Guid userId, string email);
    ClaimsPrincipal? ValidateAccessToken(string token);
    (string accessToken, RefreshToken refreshToken)? RefreshTokens(string refreshToken);
}