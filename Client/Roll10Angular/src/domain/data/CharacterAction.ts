import { IDbRecord } from "../interfaces/IDbRecord";
import { IRollable } from "./Rollable";

export interface ICharacterAction extends IDbRecord, IRollable 
{
    description: string;
    all_characters: boolean;
}