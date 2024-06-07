using DziennikTreningowyAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string? secretConnectionString = builder.Configuration["DziennikTreningowy:DefaultConnectionString"];

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(secretConnectionString == null ? builder.Configuration.GetConnectionString("DefaultConnection") : secretConnectionString);
});

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