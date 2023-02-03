namespace Roll10.Domain.Models
{
    public record User(
        string id,
        string username, 
        string email,
        string name,
        string diceroom
    );
}