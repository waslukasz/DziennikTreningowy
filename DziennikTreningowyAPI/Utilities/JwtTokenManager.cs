using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using DziennikTreningowyAPI.Domain.Entities;
using DziennikTreningowyAPI.Domain.Interfaces;
using DziennikTreningowyAPI.Infrastructure.Configurations;
using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DziennikTreningowyAPI.Utilities;

public class JwtTokenManager : IJwtTokenManager
{
    private readonly JwtSettings _jwtSettings;
    private readonly ApplicationDbContext _context;

    public JwtTokenManager(IOptions<JwtSettings> jwtSettings, ApplicationDbContext context)
    {
        _context = context;
        _jwtSettings = jwtSettings.Value;
    }

    public string GenerateAccessToken(Guid userId)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var keyBytes = Encoding.UTF8.GetBytes(_jwtSettings.Key);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.AccessTokenExpiryMinutes),
            Issuer = _jwtSettings.Issuer,
            Audience = _jwtSettings.Audience,
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var accessToken = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(accessToken);
    }

    public async Task<RefreshToken> GenerateRefreshTokenAsync(Guid accountId)
    {
        var randomNumber = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
        }

        var refreshTokenString = Convert.ToBase64String(randomNumber);

        var refreshToken = new RefreshToken()
        {
            Token = refreshTokenString,
            AccountId = accountId,
            ExpiryDate = DateTime.UtcNow.AddDays(_jwtSettings.RefreshTokenExpiryDays),
            CreatedAt = DateTime.UtcNow,
            IsRevoked = false
        };
        
        await _context.RefreshTokens.AddAsync(refreshToken);
        await _context.SaveChangesAsync();

        return refreshToken;
    }

    public ClaimsPrincipal? ValidateAccessToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var keyBytes = Encoding.UTF8.GetBytes(_jwtSettings.Key);

        try
        {
            var parameters = new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                ValidIssuer = _jwtSettings.Issuer,
                ValidAudience = _jwtSettings.Audience,
                ValidateIssuer = _jwtSettings.ValidateIssuer,
                ValidateAudience = _jwtSettings.ValidateAudience,
                ValidateLifetime = _jwtSettings.ValidateLifetime
            };

            var principal = tokenHandler.ValidateToken(token, parameters, out _);
            return principal;
        }
        catch
        {
            return null;
        }
    }

    public async Task<(string accessToken, RefreshToken refreshToken)?> RefreshTokensAsync(string refreshToken)
    {
        var existingToken =
            await _context.RefreshTokens.FirstOrDefaultAsync(token => token.Token == refreshToken && !token.IsRevoked);

        if (existingToken == null || existingToken.ExpiryDate <= DateTime.UtcNow)
        {
            return null;
            // TODO: Exception RefreshToken invalid or smth
        }

        if (await _context.Accounts.AnyAsync(account => account.Id == existingToken.AccountId))
        {
            return null;
            // TODO: Exception User do not exist. Think if this is possible. 
        }

        var newAccessToken = GenerateAccessToken(existingToken.AccountId);
        var newRefreshToken = await GenerateRefreshTokenAsync(existingToken.AccountId);
        existingToken.IsRevoked = true;
        await _context.SaveChangesAsync();
        
        return (newAccessToken, newRefreshToken);
    }
}