import {BaseDice, RemoveTrailingOperation} from "src/Helpers";
import { match } from "ts-pattern";
import { CharacterStats, ICharacter, StatSubstitute, SubstituteEffectValue } from "./Character";
import * as _ from "lodash";

export interface IRollable
{
    id: string;
    add_base_dice: boolean;
    action_effect: string;
    dice_roll: string;
    modifiers: string;
    name: string;
}

export const defaultRollable: IRollable = {
  id: "", name: "", add_base_dice: false, action_effect: "", dice_roll: "", modifiers: ""
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

export function PerformRoll(character: ICharacter, item: IRollable): { rollString: string, roll: number }
{
    let roll = 0;
    let rollString = "";

    if (!!item.dice_roll || item.add_base_dice || !!item.modifiers) {
        let opList = item.dice_roll.split(";").filter(d => !!d);
        if (item.add_base_dice)
            opList.push(`+ 1d${BaseDice}`)

        opList = opList.concat(item.modifiers.split(";").filter(m => !!m));

        roll = opList.reduce((acc, x) => {
            let parts = x.split(" ");

            let substitutedNumber = 0;
            let rolledValueLogEntry: string;

            if (/\dd\d/.test(parts[1])) {
                substitutedNumber = DiceSubstitute(parts[1])
                rolledValueLogEntry = parts[1];
            }
            else
            {
                let staticValue = parseInt(parts[1]);
                if(!isNaN(staticValue))
                {
                    substitutedNumber = staticValue;
                    rolledValueLogEntry = parts[1];
                }
                else
                {
                    substitutedNumber = StatSubstitute(character, parts[1].toUpperCase() as CharacterStats);
                    rolledValueLogEntry = parts[1].toUpperCase();
                }
            }

            rollString += `${rolledValueLogEntry}(${substitutedNumber}) ${parts[0]} `;

            return match(parts[0])
                .with("+", () => { return acc +  substitutedNumber })
                .with("-", (_ => { return acc - substitutedNumber }))
                .otherwise(_ => {
                    console.error(`Invalid Operator ${parts[0]}`);
                    return acc;
                })
        }, 0)
    }

    return { rollString: RemoveTrailingOperation(rollString), roll }
}

export function HumanReadableRollString(item: IRollable)
{
    let diceRoll = item.dice_roll
        .split(";")
        .filter(d => !!d)
        .map(d => d.split(" ").reverse().join(" "))

    if(item.add_base_dice)
        diceRoll = [`1d${BaseDice} +`, ...diceRoll];

    let modifiers = item.modifiers
        .split(";")
        .filter(m => !!m)
        .map(m => {
            let parts = m.split(" ");
            if(parts.length > 1)
            {
                parts[1] = parts[1].toUpperCase();
            }
            return parts.reverse().join(" ");
        })

    let rollString = diceRoll.concat(modifiers).join(" ");
    return RemoveTrailingOperation(rollString);
}

export function HumanReadableEffectString(character: ICharacter, rollable: IRollable)
{
    let parts = rollable.action_effect.split(";").filter(a => !!a);

    let grouped = _.chain(parts).groupBy(p => p.split(" ")[2]);
    let condensedList = grouped.keys().map(k => {
        let roll = grouped.get(k).map(p => p.split(" ").slice(0,2)).map(p => p.join(""));
        let finalVal = roll.value().reduce((acc, x) => {
            return acc + SubstituteEffectValue(character, x.replace("+", ""))
        }, 0)
        return `${(finalVal >= 0 ? "+" : "-")} ${Math.abs(finalVal)} ${k}`;
    })

    return condensedList.map(m => {
        let parts = m.toUpperCase().split(" ");
        return parts.join(" ");
    }).join(" ");
}
