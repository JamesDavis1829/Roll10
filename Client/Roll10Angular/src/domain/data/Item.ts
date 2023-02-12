import { match } from "ts-pattern";
import { IRollable } from "./Rollable";

export interface IItem extends IRollable
{
    strength_requirement: number;
    agility_requirement: number;
    intelligence_requirement: number;
    wield: Array<string>;
    category: "armor" | "weapon";
    range: string;
    weight: string;
}

export function HideDiceRoll(item: IItem): boolean
{
    return match(item.category)
        .with("armor", () => true)
        .with("weapon", () => false)
        .exhaustive()
}
