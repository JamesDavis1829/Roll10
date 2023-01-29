namespace Roll10.Models
{
    public record CharacterAction : IDbRecord, IRollable
    {
        public string id { get; init; }
        public bool add_base_dice { get; init; }
        public string action_effect { get; init; } = "";
        public string dice_roll { get; init; } = "";
        public string modifiers { get; init; } = "";
        public string name { get; init; } = "";
        public string description {get; init; } = "";
        
        public bool all_character {get; init; }
    }
}