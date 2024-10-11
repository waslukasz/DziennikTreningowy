using System.Security.Claims;

namespace DziennikTreningowyAPI.Domain.Interfaces;

public interface IJwtTokenManager
{
    string GenerateToken(Guid userId, string email, string username);
    ClaimsPrincipal? ValidateToken(string token);
}