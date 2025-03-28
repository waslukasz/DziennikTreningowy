﻿namespace DziennikTreningowyAPI.Domain.Entities;

public class Profile
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Gender { get; set; }
    public double? Height { get; set; }
    public double? Weight { get; set; }
    public DateTime? BirthDate { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Guid AccountId { get; set; }
    public Account Account { get; set; }
    public ICollection<Training> Trainings { get; set; } = new List<Training>();
    public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    public ICollection<Measurement> Measurements { get; set; } = new List<Measurement>();
}