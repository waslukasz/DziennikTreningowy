namespace DziennikTreningowyAPI.Application.DTOs.Ranking;

public class RankingDto
{
    public Guid ProfileId { get; set; }
    public string Email { get; set; }
    public int Score { get; set; }
    public int Position { get; set; }
}