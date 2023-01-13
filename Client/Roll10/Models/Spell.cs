namespace Roll10.Models
{
    public record Spell(
        string name,
        string action_effect,
        string dice_roll,
        string modifiers,
        int intelligence_requirement,
        string range,
        string description,
        string id,
        DateTime created,
        DateTime updated
    ): DbRecord(id, created, updated);
}