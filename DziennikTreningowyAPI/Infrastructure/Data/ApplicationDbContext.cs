using DziennikTreningowyAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Infrastructure.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Training> Trainings { get; set; }
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>()
            .HasOne(account => account.Profile)
            .WithOne(profile => profile.Account)
            .HasForeignKey<Profile>(profile => profile.AccountId)
            .IsRequired(true)
            .OnDelete(DeleteBehavior.Cascade);
    }
}