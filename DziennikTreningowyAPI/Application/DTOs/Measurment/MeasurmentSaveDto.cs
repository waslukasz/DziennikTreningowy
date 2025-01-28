﻿namespace DziennikTreningowyAPI.Application.DTOs.Measurment;

public class MeasurmentSaveDto
{
    public Guid Id { get; set; }
    public string BodyPart { get; set; }
    public double Value { get; set; }
    public DateTime Date { get; set; }
    public DateTime UpdatedAt { get; set; }
}