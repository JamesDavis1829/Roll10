namespace Roll10.Models
{
    public record Character : IDbRecord
    {
        public string name {get; set;} = "";
        public int strength {get; set;}
        public int agility {get; set;}
        public int durability {get; set;}
        public int hp {get; set;}
        public int stamina {get; set;}
        public int current_stamina {get; set;}
        public int intelligence {get; set;}
        public int insight {get; set;}
        public IEnumerable<Spell> spells {get; set;} = new List<Spell>();
        public IEnumerable<Item> equipment {get; set;} = new List<Item>();
        public IEnumerable<Item> inventory {get; set;} = new List<Item>();
        public string id {get; init;} = "";
    }
}