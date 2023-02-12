import { IRollable } from "./Rollable";

export interface ISpell extends IRollable
{
    intelligence_requirement: number;
    range: string;
}

export function BootstrapSpell(spell: ISpell): ISpell
{
    return {
        ...spell,
        action_effect: spell.action_effect + "+ castermod sta;"
    }
}
