using Roll10.Domain.Interfaces;
using Roll10.Domain.Models;

namespace Roll10.Domain.Services
{

    public static class DiceService
    {
        private static readonly List<string> OpList = new() { "+", "-" };

        private static int StatSubstitute(Character character, string stat)
        {
            return stat.ToUpper() switch 
            {
                "STR" => character.strength - Helpers.DiceBase,
                "AGI" => character.agility - Helpers.DiceBase,
                "DUR" => character.durability - Helpers.DiceBase,
                "STA" => character.stamina - Helpers.DiceBase,
                "INT" => character.intelligence - Helpers.DiceBase,
                "INS" => character.insight - Helpers.DiceBase,
                "ARMOR" => PerformRoll(
                    character,
                    new InlineRollable
                    {
                        dice_roll = string.Join(";",
                            character.equipment.Where(e => e.category == "armor").Select(a => a.dice_roll)),
                        modifiers = string.Join(";",
                            character.equipment.Where(e => e.category == "armor").Select(a => a.category)),
                    }
                ).Item1,
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

        public static (int, string) PerformRoll(Character character, IRollable item)
        {
            var readableRoll = "";
            var roll = 0;

            if(!string.IsNullOrEmpty(item.dice_roll) || item.add_base_dice)
            {
                var opList = item.dice_roll.Split(";").ToList();
                if(item.add_base_dice)
                {
                    opList.Add($"+ 1d{Helpers.DiceBase}");
                }
                opList.AddRange(item.modifiers.Split(";").ToList());
                opList = opList.Where(s => !string.IsNullOrEmpty(s)).ToList();

                roll = opList.Aggregate(0, (acc, x) => {
                    var parts = x.Split(" ");
                    var substitutedNumber = 0;
                    var rolledValueLogEntry = "";

                    if(parts[1].Contains('d'))
                    {
                        substitutedNumber = DiceSubstitute(parts[1]);
                        rolledValueLogEntry = parts[1];
                    }
                    else
                    {
                        if(int.TryParse(parts[1], out var staticValue))
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
            return (roll, RemoveTrailingOperation(readableRoll));
        }

        public static string HumanReadableRollString(IRollable item)
        {
            var diceRoll = item.dice_roll
                .Split(";")
                .Where(s => !string.IsNullOrEmpty(s))
                .Select(d => string.Join(" ",d.Split(" ").Reverse()));

            if(item.add_base_dice)
            {
                diceRoll = diceRoll.Prepend($"1d{Helpers.DiceBase} +");
            }

            var modifiers = item.modifiers
                .Split(";")
                .Where(s => !string.IsNullOrEmpty(s))
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