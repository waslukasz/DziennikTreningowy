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
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

string? externalDbConnectionString = builder.Configuration["DziennikTreningowy:DefaultConnectionString"];

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(externalDbConnectionString ?? builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Repositories
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITrainingRepository, TrainingRepository>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();
// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITrainingService, TrainingService>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();