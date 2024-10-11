using DziennikTreningowyAPI.Application.DTOs.User;
using DziennikTreningowyAPI.Application.Mappers;
using DziennikTreningowyAPI.Application.Services;
using DziennikTreningowyAPI.Application.Validators;
using DziennikTreningowyAPI.Domain.Interfaces;
using DziennikTreningowyAPI.Infrastructure.Configurations;
using DziennikTreningowyAPI.Infrastructure.Data;
using DziennikTreningowyAPI.Infrastructure.Repositories;
using DziennikTreningowyAPI.Utilities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);
// Database connection

//// Optional connection to external database using 'user-secrets'
string? externalDbConnectionString = builder.Configuration["DziennikTreningowyAPI:ExternalDbConnectionString"];

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(externalDbConnectionString ?? builder.Configuration.GetConnectionString("DefaultConnection"));
});

Console.WriteLine($"API is using {(externalDbConnectionString == null ? "internal" : "external")} database connection string.");

// JwtToken
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddSingleton<IJwtTokenManager, JwtTokenManager>();

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITrainingRepository, TrainingRepository>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();
// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITrainingService, TrainingService>();
builder.Services.AddScoped<IExerciseService, ExerciseService>();
// Validators
builder.Services.AddScoped<IValidator<UserCreateDto>, UserCreateDtoValidator>();
// Utilities
builder.Services.AddScoped<IPasswordHasher, Pbkdf2PasswordHasher>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
