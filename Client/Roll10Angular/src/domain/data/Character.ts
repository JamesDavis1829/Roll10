import { BaseDice, Clamp } from 'src/Helpers';
import { IDbRecord } from '../interfaces/IDbRecord'
import { IItem } from './Item';
import { ISpell } from "./Spell";
import { match } from "ts-pattern";
import {defaultRollable, PerformRoll} from './Rollable';
import {ICharacterAction} from "./CharacterAction";

export interface ICharacter extends IDbRecord
{
    name: string;
    strength: number;
    agility: number;
    durability: number;
    max_hp: number;
    hp: number;
    stamina: number;
    max_stamina: number;
    current_stamina: number;
    intelligence: number;
    insight: number;
    spells: Array<ISpell>;
    equipment: Array<IItem>;
    inventory: Array<IItem>;
    caster_type: "none" | "quarter" | "half" | "full";
    actions: Array<ICharacterAction>;
    level: number;
}

export const defaultCharacter:ICharacter = {
  actions: [], hp: 0, name: "", insight: 0, agility: 0, caster_type: "none", current_stamina: 0, durability: 0,
  equipment: [], id: "", intelligence: 0, inventory: [], spells: [], stamina: 0, strength: 0, level: 0,
  max_hp: 0, max_stamina: 0
}

export type StatOperands = "STA" | "HP";

export type CharacterStats = "STR" | "AGI" | "DUR" | "STA" | "INT" | "INS" | "ARMOR"

export function StatSubstitute(character: ICharacter, stat: CharacterStats)
{
    return match(stat)
        .with("STR", () => { return character.strength - BaseDice })
        .with("AGI", () => { return character.agility - BaseDice })
        .with("DUR", () => { return character.durability - BaseDice })
        .with("STA", () => { return character.stamina - BaseDice })
        .with("INT", () => { return character.intelligence - BaseDice })
        .with("INS", () => { return character.insight - BaseDice })
        .with("ARMOR", () => {
          return PerformRoll(character, {
            ...defaultRollable,
            dice_roll: character.equipment.filter(c => c.category == 'armor').map(c => c.dice_roll).join(";"),
            modifiers: character.equipment.filter(c => c.category == 'armor').map(c => c.modifiers).join(";"),
            add_base_dice : false,
        }).roll})
        .exhaustive();
}

export function ApplyMaxAndMinimums(character: ICharacter): ICharacter
{
    return  {
        ...character,
        current_stamina: Clamp(character.current_stamina, 0, character.max_stamina),
        hp: Clamp(character.hp, 0, character.max_hp)
    }
}

export function ApplyEffect(character: ICharacter, op: number, stat: StatOperands, applyMaxAndMin = true): ICharacter
{
    var appliedCharacter = match(stat.toUpperCase() as StatOperands)
        .with("STA", () => { return {...character, current_stamina: character.current_stamina + op}})
        .with("HP", () => { return {...character, hp: character.hp + op}})
        .exhaustive()

    if(applyMaxAndMin)
        return ApplyMaxAndMinimums(appliedCharacter);
    else
        return appliedCharacter;
}

export function ApplyEffects(character: ICharacter, effectString: string): ICharacter
{
    if(!effectString)
        return {...character};

    var effects = effectString.split(";").filter(e => !!e);
    var effectedCharacter = effects.reduce((acc, value) => {
        var operationParts = value.split(" ").filter(v => !!v);
        var opValue = {
            operation: operationParts[0],
            value: SubstituteEffectValue(character, operationParts[1])
        }

        var operation = match(opValue.operation)
            .with("+", () => { return  opValue.value})
            .with("-", () => { return -opValue.value })
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
