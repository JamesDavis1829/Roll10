namespace Roll10.Models
{
    public class Item: IDbRecord
    {
        public string name {get; init;} = "";
        public int strength_requirement {get; init;}
        public int agility_requirement {get; init;}
        public int intelligence_requirement {get; init;}
        public IEnumerable<string> wield {get; init;}
        public string action_effect {get; init;} = "";
        public string dice_roll {get; init;} = "";
        public string modifier {get; init;} = "";
        public string category {get; init;} = "";
        public string description {get; init;} = "";
        public string range {get; init;} = "";
        public string weight {get; init;} = "";
        public string id {get; set;} = "";
    }
}