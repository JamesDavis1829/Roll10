namespace Roll10.Domain.Interfaces
{
    public interface IRollable
    {
        string id { get; init; }
        bool add_base_dice {get; init;}
        string action_effect {get; init;}
        string dice_roll {get; init;}
        string modifiers {get; init;}
        string name {get; init;}
    }

    public class InlineRollable : IRollable
    {
        public string id { get; init; } = "InlineRollable";
        public bool add_base_dice { get; init; }
        public string action_effect { get; init; } = "";
        public string dice_roll { get; init; } = "";
        public string modifiers { get; init; } = "";
        public string name { get; init; } = "";
    }
}
