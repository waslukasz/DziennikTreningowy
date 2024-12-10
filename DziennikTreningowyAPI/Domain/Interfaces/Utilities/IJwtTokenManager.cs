using System.Security.Claims;
using DziennikTreningowyAPI.Domain.Entities;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface IJwtTokenManager
{
    string GenerateAccessToken(Guid accountId);
    Task<RefreshToken> GenerateRefreshTokenAsync(Guid accountId);
    ClaimsPrincipal? ValidateAccessToken(string token);
    Task<(string accessToken, RefreshToken refreshToken)?> RefreshTokensAsync(string refreshToken);
}