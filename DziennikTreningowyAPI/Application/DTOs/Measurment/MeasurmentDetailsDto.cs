﻿namespace DziennikTreningowyAPI.Application.DTOs.Measurment;

public class MeasurmentDetailsDto
{
    public Guid Id { get; set; }
    public Guid ProfileId { get; set; }
    public string Type { get; set; }
    public double Value { get; set; }
    public DateTime MeasuredAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}