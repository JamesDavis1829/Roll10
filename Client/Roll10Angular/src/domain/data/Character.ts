import { Clamp } from 'src/Helpers';
import { IDbRecord } from '../interfaces/IDbRecord'
import { IItem } from './Item';
import { ISpell } from "./Spell";
import { match } from "ts-pattern";

export interface ICharacter extends IDbRecord {
    name: string;
    strength: number;
    agility: number;
    durability: number;
    hp: number;
    stamina: number;
    current_stamina: number;
    intelligence: number;
    insight: number;
    spells: Array<ISpell>;
    equipment: Array<IItem>;
    inventory: Array<IItem>;
    caster_type: "none" | "quarter" | "half" | "full";
}

type StatOperands = "STA" | "HP";

export function ApplyMaxAndMinimums(character: ICharacter): ICharacter 
{
    return  {
        ...character,
        current_stamina: Clamp(character.current_stamina, 0, character.stamina),
        hp: Clamp(character.hp, 0, character.durability)
    }
}

export function ApplyEffect(character: ICharacter, op: number, stat: StatOperands, applyMaxAndMin = true): ICharacter 
{
    var appliedCharacter = match(stat)
        .with("STA", () => { return {...character, current_stamina: character.current_stamina + op}})
        .with("HP", () => { return {...character, hp: character.hp + op}})
        .exhaustive()

    return match(applyMaxAndMin)
        .with(true, () => { return ApplyMaxAndMinimums(appliedCharacter) })
        .with(false, () => { return appliedCharacter })
        .exhaustive()
}

export function ApplyEffects(character: ICharacter, effectString: string): ICharacter
{
    if(!effectString)
        return {...character};
    
    var effects = effectString.split(";").filter(e => !e);
    var effectedCharacter = effects.reduce((acc, value) => {
        var operationParts = value.split(" ").filter(v => !v);
        var opValue = {
            operation: operationParts[0],
            value: SubstituteEffectValue(character, operationParts[1])
        }

        var operation = match(opValue.operation)
            .with("+", (v) => { return  opValue.value})
            .with("-", (v) => { return -opValue.value })
            .otherwise(val => {
                console.error(`Invalid operand ${val}`)
                return 0
            })

        return ApplyEffect(acc, operation, operationParts[2] as StatOperands, false);
    }, character)

    return ApplyMaxAndMinimums(effectedCharacter);
}

export function SubstituteEffectValue(character: ICharacter, val: string)
{
    return match(val.toUpperCase())
        .with("CASTERMOD", () => {
            return match(character.caster_type)
                .with("none", () => 0)
                .with("quarter", () => 1)
                .with("half", () => 2)
                .with("full", () => 3)
                .exhaustive()
        })
        .otherwise((val) => parseInt(val))
}