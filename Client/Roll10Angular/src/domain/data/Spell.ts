import { IRollable } from "./Rollable";

export interface ISpell extends IRollable
{
    intelligence_requirement: number;
    range: string;
}
