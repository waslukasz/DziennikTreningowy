﻿namespace DziennikTreningowyAPI.Domain.Entities;

public class Exercise
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; }
    public int Repetitions { get; set; }
    public int Sets { get; set; }
    public double Weight { get; set; }
    
    public Guid TrainingId { get; set; }
    public virtual Training Training { get; set; }
}