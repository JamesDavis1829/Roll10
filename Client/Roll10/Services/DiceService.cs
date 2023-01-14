namespace Roll10.DiceService
{
    public static class DiceService
    {
        private static List<string> OpList = new List<string> { "+", "-" };
        public static string HumanReadableRollString(IRollable item)
        {
            var diceRoll = item.dice_roll
                .Split(";")
                .Select(d => {
                    return string.Join(" ",d.Split(" ").Reverse());
                });

            if(item.add_base_dice)
            {
                diceRoll = diceRoll.Prepend("1d10 +");
            }

            var modifiers = item.modifiers
                .Split(";")
                .Select(m => {
                    var parts = m.Split(" ");
                    if(parts.Count() > 1)
                    {
                        parts[1] = parts[1].ToUpper();
                    }
                    return string.Join(" ", parts.Reverse());
                });

            var rollString = string.Join(" ", diceRoll.Concat(modifiers)).Trim();
            
            if(OpList.Contains(rollString.Last().ToString()))
            {
                rollString = rollString.Substring(0, rollString.Length - 1);
            }

            return rollString;
        }
    }
}