using DziennikTreningowyAPI.Application.DTOs.Account;
using DziennikTreningowyAPI.Application.Mappers;
using DziennikTreningowyAPI.Application.Services;
using DziennikTreningowyAPI.Application.Validators;
using DziennikTreningowyAPI.Domain.Interfaces;
using DziennikTreningowyAPI.Domain.Interfaces.Account;
using DziennikTreningowyAPI.Domain.Interfaces.Exercise;
using DziennikTreningowyAPI.Domain.Interfaces.Measurement;
using DziennikTreningowyAPI.Domain.Interfaces.Profile;
using DziennikTreningowyAPI.Domain.Interfaces.Training;
using DziennikTreningowyAPI.Domain.Interfaces.Utilities;
using DziennikTreningowyAPI.Infrastructure.Configurations;
using DziennikTreningowyAPI.Infrastructure.Repositories;
using DziennikTreningowyAPI.Utilities;
using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger(); // From SwaggerConfiguration.cs
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly);

// Database connection
builder.Services.ConfigureDatabase(builder.Configuration); // From DatabaseConfiguration.cs

// JwtToken
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddScoped<IJwtTokenManager, JwtTokenManager>();

// Repositories
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IProfileRepository, ProfileRepository>();
builder.Services.AddScoped<ITrainingRepository, TrainingRepository>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();
builder.Services.AddScoped<IMeasurementRepository, MeasurementRepository>();
builder.Services.AddScoped<ISyncRepository, SyncRepository>();
// Services
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<ISyncService, SyncService>();
// Validators
builder.Services.AddScoped<IValidator<AccountRegisterDto>, AccountRegisterDtoValidator>();
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
