namespace Roll10.Models
{
    public record Character(
        string name,
        int agility,
        int durability,
        int stamina,
        int current_stamina,
        int intelligence,
        int insight,
        IEnumerable<Spell> spells,
        IEnumerable<Item> equipment,
        IEnumerable<Item> inventory,
        string id, 
        DateTime created,
        DateTime updated
    ): DbRecord(id, created, updated);
}