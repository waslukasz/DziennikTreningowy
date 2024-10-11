using System.Security.Claims;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface IJwtTokenManager
{
    (string AccessToken, string RefreshToken) GenerateTokens(Guid userId, string email);
    ClaimsPrincipal? ValidateToken(string token);
    string GenerateRefreshToken();
    bool ValidateRefreshToken(Guid userId, string refreshToken);
    (string AccessToken, string RefreshToken)? RefreshTokens(string refreshToken);
}