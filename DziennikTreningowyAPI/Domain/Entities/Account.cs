namespace DziennikTreningowyAPI.Domain.Entities;

public class Account
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    public Profile Profile { get; set; }
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}