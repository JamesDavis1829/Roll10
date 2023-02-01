using Roll10.Domain.Models;

namespace Roll10.Domain.Services;

public static class CharacterService 
{
    public static Character ApplyMaxAndMinimums(Character character)
    {
        return character with
        {
            current_stamina = Math.Clamp(character.current_stamina, 0, character.stamina),
            hp = Math.Clamp(character.hp, 0, character.durability)
        };
    }
    public static Character ApplyEffect(Character character, int op, string stat, bool applyMaxAndMin = true)
    {
        var appliedStatCharacter = stat.ToUpper() switch {
            "STA" => character with { 
                current_stamina = character.current_stamina + op 
            },
            "HP" => character with { 
                hp = character.hp + op 
            },
            _ => throw new Exception("Unknown effect")
        };

        return applyMaxAndMin switch
        {
            true => ApplyMaxAndMinimums(appliedStatCharacter),
            false => appliedStatCharacter
        };
    }
    public static Character ApplyEffects(Character character, string effectString)
    {
        if(string.IsNullOrEmpty(effectString))
            return character;
            
        var effectParts = effectString.Split(";").Where(p => !string.IsNullOrEmpty(p));
        var effectedCharacter = effectParts.Aggregate(character, (acc, x) => {
            var operationParts = x.Split(" ");
            var opValue = new {
                Operation = operationParts[0],
                Value = SubstituteEffectValue(character,  operationParts[1])
            };

            var operation = opValue.Operation switch {
                "+" => opValue.Value,
                "-" => int.Parse($"-{opValue.Value}"),
                _ => throw new Exception("Invalid operator")
            };

            return ApplyEffect(acc, operation, operationParts[2], false);
        });

        return ApplyMaxAndMinimums(effectedCharacter);
    }
    
    private static int SubstituteEffectValue(Character character, string val)
    {
        return val.ToUpper() switch
        {
            "CASTERMOD" => character.caster_type.ToUpper() switch
            {
                "NONE" => 0,
                "QUARTER" => 1,
                "HALF" => 2,
                "FULL" => 3,
                _ => 0
            },
            _ => int.Parse(val)
        };
    }
}