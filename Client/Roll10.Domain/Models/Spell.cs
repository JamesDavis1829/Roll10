using Roll10.Domain.Interfaces;

namespace Roll10.Domain.Models
{
    public record Spell : IDbRecord, IRollable
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

        public Spell(string name, string action_effect, string dice_roll, string modifiers, int intelligence_requirement, string range, string description, string id, bool add_base_dice)
        {
            this.name = name;
            this.action_effect = action_effect + "+ castermod sta;";
            this.dice_roll = dice_roll;
            //All spells will have their caster mods added
            this.modifiers = modifiers;
            this.intelligence_requirement = intelligence_requirement;
            this.range = range;
            this.description = description;
            this.id = id;
            this.add_base_dice = add_base_dice;
        }
    }

}