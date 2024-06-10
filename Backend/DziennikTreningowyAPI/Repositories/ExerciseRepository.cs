using DziennikTreningowyAPI.Data;
using DziennikTreningowyAPI.Dtos.Exercise;
using DziennikTreningowyAPI.Interfaces;
using DziennikTreningowyAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DziennikTreningowyAPI.Repositories;

// TODO: Fix Update/Create if project in request does not exist.
public class ExerciseRepository(ApplicationDbContext context) : IExerciseRepository
{
    public async Task<List<Exercise>> GetAllAsync()
    {
        return await context.Exercises.ToListAsync();
    }

    public async Task<Exercise?> GetByIdAsync(int id)
    {
        return await context.Exercises.FirstOrDefaultAsync((e) => e.Id == id);
    }

    public async Task<Exercise> CreateAsync(Exercise exercise)
    {
        await context.Exercises.AddAsync(exercise);
        await context.SaveChangesAsync();
        return exercise;
    }

    public async Task<Exercise?> UpdateAsync(int id, UpdateExerciseRequestDto request)
    {
        Exercise? exercise = await context.Exercises.FindAsync(id);
        if (exercise == null) return null;
        
        exercise.Name = request.Name;
        exercise.Description = request.Description;
        exercise.Weight = request.Weight;
        exercise.Repetitions = request.Repetitions;
        exercise.Duration = request.Duration;
        exercise.TrainingId = request.TrainingId;
        
        await context.SaveChangesAsync();
        return exercise;
    }

    public async Task<Exercise?> DeleteAsync(int id)
    {
        Exercise? exercise = await context.Exercises.FindAsync(id);
        if (exercise == null) return null;
        context.Exercises.Remove(exercise);
        await context.SaveChangesAsync();
        return exercise;
    }
}