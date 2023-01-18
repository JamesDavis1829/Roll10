using Roll10.Models;

namespace Roll10.DiceService
{
    public record DiceLogEntry(
        string Title,
        string DiceRoll,
        string RolledAmount
    );

    public static class DiceService
    {
        private static List<string> OpList = new List<string> { "+", "-" };

        public static List<DiceLogEntry> DiceLog = new List<DiceLogEntry>();

        private static int StatSubstitute(Character character, string stat)
        {
            return stat.ToUpper() switch 
            {
                "STR" => character.strength - Constants.DiceBase,
                "AGI" => character.agility - Constants.DiceBase,
                "DUR" => character.durability - Constants.DiceBase,
                "STA" => character.stamina - Constants.DiceBase,
                "INT" => character.intelligence - Constants.DiceBase,
                "INS" => character.insight - Constants.DiceBase,
                "ARMOR" => PerformRoll(
                                character, 
                                new InlineRollable { dice_roll = string.Join(";",character.equipment.Where(e => e.category == "armor").Select(a => a.dice_roll).ToList()) }, 
                                true
                            ),
                _ => 0
            };
        }

        private static int DiceSubstitute(string diceString)
        {
            var parts = diceString.Split("d");
            var output = 0;
            var rolls = int.Parse(parts[0]);
            var maxValue = int.Parse(parts[1]);
            for(var x = 0; x < rolls; x++)
            {
                output += new Random().Next(maxValue) + 1;
            }
            return output;
        }

        public static int PerformRoll(Character character, IRollable item, bool isSilent = false)
        {
            var readableRoll = "";
            var roll = 0;

            if(!string.IsNullOrEmpty(item.dice_roll) || item.add_base_dice)
            {
                var opList = item.dice_roll.Split(";").ToList();
                if(item.add_base_dice)
                {
                    opList.Add($"+ 1d{Constants.DiceBase}");
                }
                opList.AddRange(item.modifiers.Split(";").ToList());
                opList = opList.Where(s => !string.IsNullOrEmpty(s)).ToList();

                roll = opList.Aggregate(0, (acc, x) => {
                    var parts = x.Split(" ");
                    var substitutedNumber = 0;
                    var rolledValueLogEntry = "";

                    if(parts[1].Contains("d"))
                    {
                        substitutedNumber = DiceSubstitute(parts[1]);
                        rolledValueLogEntry = parts[1];
                    }
                    else
                    {
                        int staticValue;
                        if(int.TryParse(parts[1], out staticValue))
                        {
                            substitutedNumber = staticValue;
                            rolledValueLogEntry = parts[1];
                        }   
                        else
                        {
                            substitutedNumber = StatSubstitute(character, parts[1]);
                            rolledValueLogEntry = parts[1].ToUpper();
                        }
                    }

                    readableRoll += $"{rolledValueLogEntry}({substitutedNumber}) {parts[0]} ";

                    return parts[0] switch 
                    {
                        "+" => acc + substitutedNumber,
                        "-" => acc - substitutedNumber,
                        _ => throw new Exception($"Invalid operator {parts[0]}")
                    };
                });
            }

            if(!isSilent)
            {
                DiceLog.Add(new DiceLogEntry(
                    $"{character.name} - {item.name}",
                    RemoveTrailingOperation(readableRoll),
                    roll.ToString()
                ));
            }

            return roll;
        }

        public static string HumanReadableRollString(IRollable item)
        {
            var diceRoll = item.dice_roll
                .Split(";")
                .Select(d => {
                    return string.Join(" ",d.Split(" ").Reverse());
                });

            if(item.add_base_dice)
            {
                diceRoll = diceRoll.Prepend($"1d{Constants.DiceBase} +");
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

            var rollString = string.Join(" ", diceRoll.Concat(modifiers));
            
            

            return RemoveTrailingOperation(rollString);
        }

        private static string RemoveTrailingOperation(string rollString)
        {
            if(string.IsNullOrEmpty(rollString))
            {
                return  "";
            }

            rollString = rollString.Trim();
            if(OpList.Contains(rollString.Last().ToString()))
            {
                rollString = rollString.Substring(0, rollString.Length - 1);
            }
            return rollString.Trim();
        }
    }
}