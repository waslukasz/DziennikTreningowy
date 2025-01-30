using DziennikTreningowyAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Infrastructure.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Profile> Profiles { get; set; }
    public DbSet<Training> Trainings { get; set; }
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<Measurement> Measurements { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>()
            .HasOne(account => account.Profile)
            .WithOne(profile => profile.Account)
            .HasForeignKey<Profile>(profile => profile.AccountId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Account>()
            .HasMany(account => account.RefreshTokens)
            .WithOne(refreshToken => refreshToken.Account)
            .HasForeignKey(refreshToken => refreshToken.AccountId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Profile>()
            .HasMany(profile => profile.Trainings)
            .WithOne(training => training.Profile)
            .HasForeignKey(training => training.ProfileId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Profile>()
            .HasMany(profile => profile.Exercises)
            .WithOne(measurement => measurement.Profile)
            .HasForeignKey(measurement => measurement.ProfileId)
            .OnDelete(DeleteBehavior.NoAction);
        
        modelBuilder.Entity<Profile>()
            .HasMany(profile => profile.Measurements)
            .WithOne(measurement => measurement.Profile)
            .HasForeignKey(measurement => measurement.ProfileId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Training>()
            .HasMany(training => training.Exercises)
            .WithOne(exercise => exercise.Training)
            .HasForeignKey(exercise => exercise.TrainingId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        
        base.OnModelCreating(modelBuilder);
    }
}