namespace Roll10.Models
{
    public class Spell : IDbRecord, IRollable
    {
        public string name {get;init;} = "";
        public string action_effect {get;init;} = "";
        public string dice_roll {get;init;} = "";
        public string modifiers {get;init;} = "";
        public int intelligence_requirement {get;init;}
        public string range {get;init;} = "";
        public string description {get;init;} = "";
        public string id {get;init;} = "";
        public bool add_base_dice {get; init;} = false;
    }

}