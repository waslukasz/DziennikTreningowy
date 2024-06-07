using DziennikTreningowyAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {
        
    }

    public DbSet<Training> Trainings { get; set; }
    public DbSet<Exercise> Exercises { get; set; }
}