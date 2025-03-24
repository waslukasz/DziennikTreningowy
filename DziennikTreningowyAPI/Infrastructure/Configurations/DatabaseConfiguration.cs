using DziennikTreningowyAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Infrastructure.Configurations;

public static class DatabaseConfiguration
{
    public static void ConfigureDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        string? externalDbConnectionString = configuration["DziennikTreningowyAPI:ExternalDbConnectionString"];

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(externalDbConnectionString ?? configuration.GetConnectionString("DefaultConnection"));
        });

        Console.WriteLine($"API is using {(externalDbConnectionString == null ? "internal" : "external")} database connection string.");
    }
}