namespace DziennikTreningowyAPI.Domain.Entities;

public class Account
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public Profile Profile { get; set; }
}