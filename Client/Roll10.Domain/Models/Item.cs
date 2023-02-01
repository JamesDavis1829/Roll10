using Roll10.Domain.Interfaces;

namespace Roll10.Domain.Models
{
    public record Item: IDbRecord, IRollable
    {
        public string name {get; init;} = "";
        public int strength_requirement {get; init;}
        public int agility_requirement {get; init;}
        public int intelligence_requirement {get; init;}
        public IEnumerable<string> wield { get; init; } = new List<string>();
        public string action_effect {get; init;} = "";
        public string dice_roll {get; init;} = "";
        public string modifiers {get; init;} = "";
        public string category {get; init;} = "";
        public string description {get; init;} = "";
        public string range {get; init;} = "";
        public string weight {get; init;} = "";
        public string id {get; init;} = "";
        public bool add_base_dice { get; init; } = false;
    }
}