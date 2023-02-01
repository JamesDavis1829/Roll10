using Roll10.Domain.Models;

namespace Roll10.Domain.Services;

public static class CharacterService 
{
    public static Character ApplyEffect(Character character, int op, string stat)
    {
        return stat.ToUpper() switch {
            "STA" => character with { 
                current_stamina = Math.Clamp(character.current_stamina + op, 0, character.stamina) 
            },
            "HP" => character with { 
                hp = Math.Clamp(character.hp + op, 0, character.durability) 
            },
            _ => throw new Exception("Unknown effect")
        };
    }
    public static Character ApplyEffects(Character character, string effectString)
    {
        if(string.IsNullOrEmpty(effectString))
            return character;
            
        var effectParts = effectString.Split(";").Where(p => !string.IsNullOrEmpty(p));
        return effectParts.Aggregate(character, (acc, x) => {
            var operationParts = x.Split(" ");
            var opValue = new {
                Operation = operationParts[0],
                Value = operationParts[1]
            };

            var operation = opValue.Operation switch {
                "+" => int.Parse(opValue.Value),
                "-" => int.Parse($"-{opValue.Value}"),
                _ => throw new Exception("Invalid operator")
            };

            return ApplyEffect(acc, operation, operationParts[2]);
        });
    }
}