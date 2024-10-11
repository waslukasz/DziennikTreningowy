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

        Console.WriteLine($"JWT is using Key from {(secretKey == null ? "appsettings.json" : "user-secrets")}.");

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
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key)),
                    ValidateIssuer = jwtSettings.ValidateIssuer,
                    ValidateAudience = jwtSettings.ValidateAudience,
                    ValidateLifetime = jwtSettings.ValidateLifetime,
                    ValidateIssuerSigningKey = jwtSettings.ValidateIssuerSigningKey
                };
            });

        services.AddAuthorization();
    }
}