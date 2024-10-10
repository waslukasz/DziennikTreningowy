using DziennikTreningowyAPI.Application.Mappers;
using DziennikTreningowyAPI.Application.Services;
using DziennikTreningowyAPI.Domain.Interfaces;
using DziennikTreningowyAPI.Infrastructure.Data;
using DziennikTreningowyAPI.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

// Database connection
string? externalDbConnectionString = builder.Configuration["DziennikTreningowy:DefaultConnectionString"];

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(externalDbConnectionString ?? builder.Configuration.GetConnectionString("DefaultConnection"));
});

Console.WriteLine($"API is using {(externalDbConnectionString == null ? "internal" : "external")} database connection string.");

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITrainingRepository, TrainingRepository>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();
// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITrainingService, TrainingService>();
builder.Services.AddScoped<IExerciseService, ExerciseService>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
