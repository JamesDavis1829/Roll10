import {defaultCharacter, ICharacter} from "./domain/data/Character";

export const BaseDice = 10;

export interface ICharacterStats {
  name: string;
  abbreviation: string;
  stat: number
}

export const characterStatOptions = ["Strength","Agility","Durability","Stamina","Intelligence","Insight"] as const;
export type CharacterStatOption = typeof characterStatOptions[number];

export const CharacterStats = (character: ICharacter) => {
  return [
    {name: "Strength", abbreviation: "STR", stat: character.strength},
    {name: "Agility", abbreviation: "AGI", stat: character.agility},
    {name: "Durability", abbreviation: "DUR", stat: character.durability},
    {name: "Stamina", abbreviation: "STA", stat: character.stamina},
    {name: "Intelligence", abbreviation: "INT", stat: character.intelligence},
    {name: "Insight", abbreviation: "INS", stat: character.insight}
  ] as ICharacterStats[];
}

export type Nullable<T> = T | null;
export type Selectable<T> = {
  isSelected: boolean;
  item: T;
}

export const Clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const IsNotNull = (x:any) => (x != null && true);

export const GenerateId = () =>
{
    const chars = "abcdefghijklmopqrstuvwxyz";
    return [...Array(15).keys()].map(_ => {
        return chars.charAt(Math.random() * chars.length);
    }).join('');
}

export const RemoveTrailingOperation = (rollString: string) =>
{
    if(!rollString)
        return "";

    rollString = rollString.trim();
    if(["+","-"].includes(rollString.charAt(rollString.length - 1)))
    {
        rollString = rollString.substring(0, rollString.length - 1);
    }
    return rollString.trim();
}

export function ForceCast<T>(a: any)
{
    return (a as unknown) as T;
}

export function Delay(milliseconds: number)
{
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => { resolve() }, milliseconds);
  })
}
