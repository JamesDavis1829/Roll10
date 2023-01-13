namespace Roll10.Models
{
    public record Item(
        string name,
        int strength_requirement,
        int agility_requirement,
        int intelligence_requirement,
        IEnumerable<string> wield,
        string action_effect,
        string dice_roll,
        string modifier,
        string category,
        string description, 
        string range,
        string weight,
        DateTime created,
        DateTime updated,
        string id
    ): DbRecord(id, created, updated);
}