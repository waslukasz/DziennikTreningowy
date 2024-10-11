using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace DziennikTreningowyAPI.Infrastructure.Configurations;

public static class JwtConfiguration
{
    public static void AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtSettings = new JwtSettings();
        configuration.GetSection("Jwt").Bind(jwtSettings);
        
        // Using intended JwtSecret using 'user-secrets', if it does not exist, using placeholder from appsettings.json
        string? secretKey = configuration["DziennikTreningowyAPI:JwtSecret"];
        jwtSettings.Key = secretKey ?? jwtSettings.Key;
        
        // Registering settings for global use
        services.Configure<JwtSettings>(options =>
        {
            options.Key = jwtSettings.Key;
            options.Issuer = jwtSettings.Issuer;
            options.Audience = jwtSettings.Audience;
            options.ValidateIssuer = jwtSettings.ValidateIssuer;
            options.ValidateAudience = jwtSettings.ValidateAudience;
            options.ValidateLifetime = jwtSettings.ValidateLifetime;
            options.ValidateIssuerSigningKey = jwtSettings.ValidateIssuerSigningKey;
            options.AccessTokenExpiryMinutes = jwtSettings.AccessTokenExpiryMinutes;
            options.RefreshTokenExpiryDays = jwtSettings.RefreshTokenExpiryDays;
        });
        
        // JWT Bearer configuration
        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key))
                };
            });
    }
}