import { ICharacter } from "./Character";
import {EvaluateDSL} from "../dsl/DSL";

export interface IRollable
{
    id: string;
    name: string;
    description: string;
    dslEquation: string;
    humanReadable: string;
}

export const defaultRollable: IRollable = {
  id: "", name: "", description: "", dslEquation: "", humanReadable: ""
}

export function DiceSubstitute(diceString: string)
{
    let parts = diceString.split("d");
    let rolls = parseInt(parts[0]);
    let maxValue = parseInt(parts[1]);
    return [...Array(rolls).keys()].map(_ => {
        return Math.floor(Math.random() * maxValue) + 1;
    }).reduce((x, acc) => {
        return acc + x;
    }, 0)
}

export function HumanReadableDSLEffectString(character: ICharacter, rollable: IRollable)
{
  //TODO: Two very similar functions below, refactor later
  let effectStrings = [];
  for(let command of rollable.dslEquation.split(";"))
  {
    let staminaEffects = /addsta\((.+)\)/.exec(command);
    if(staminaEffects?.[1])
    {
      let staEval = EvaluateDSL(character, staminaEffects[1]).value;
      effectStrings.push(`${(staEval >= 0 ? "+" : "-")} ${Math.abs(staEval)} STA`);
    }

    let hpEffects = /addhp\((.+)\)/.exec(command);
    if(hpEffects?.[1])
    {
      let hpEval = EvaluateDSL(character, hpEffects[1]).value;
      effectStrings.push(`${(hpEval >= 0 ? "+" : "-")} ${Math.abs(hpEval)} HP`);
    }
  }
  return effectStrings.join(" ");
}
