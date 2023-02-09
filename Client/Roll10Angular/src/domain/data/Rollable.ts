import { BaseDice, RemoveTrailingOperation } from "src/Helpers";
import { match } from "ts-pattern";
import { CharacterStats, ICharacter, StatSubstitue, SubstituteEffectValue } from "./Character";
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

export function DiceSubstitute(diceString: string)
{
    var parts = diceString.split("d");
    var rolls = parseInt(parts[0]);
    var maxValue = parseInt(parts[1]);
    return Array(rolls).map(_ => {
        return Math.round(Math.random() * maxValue) + 1;
    }).reduce((x, acc) => {
        return acc + x;
    }, 0)
}

export function PerformRoll(character: ICharacter, item: IRollable): { rollString: string, roll: number } 
{
    var roll = 0;
    var rollString = "";

    if (!!item.dice_roll || item.add_base_dice) {
        var opList = item.dice_roll.split(";").filter(d => !d);
        if (item.add_base_dice)
            opList.push(`+ 1d${BaseDice};`)

        opList.concat(item.modifiers.split(";").filter(m => !m));

        roll = opList.reduce((acc, x) => {
            var parts = x.split(" ");

            var substitutedNumber = 0;
            var rolledValueLogEntry = "";

            if (parts[1].includes("d")) {
                substitutedNumber = DiceSubstitute(parts[1])
                rolledValueLogEntry = parts[1];
            }
            else
            {
                var staticValue = parseInt(parts[1]);
                if(staticValue)
                {
                    substitutedNumber = staticValue;
                    rolledValueLogEntry = parts[1];
                }
                else
                {
                    substitutedNumber = StatSubstitue(character, parts[1].toUpperCase() as CharacterStats);
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

    return { rollString, roll }
}

export function HumanReadableRollString(item: IRollable)
{
    var diceRoll = item.dice_roll
        .split(";")
        .filter(d => !d)
        .map(d => d.split(" ").reverse().join(" "))
    
    if(item.add_base_dice)
        diceRoll = [`1d${BaseDice} +`, ...diceRoll];

    var modifiers = item.modifiers
        .split(";")
        .filter(m => !m)
        .map(m => {
            var parts = m.split(" ");
            if(parts.length > 1)
            {
                parts[1] = parts[1].toUpperCase();
            }
            return parts.reverse().join(" ");
        })

    var rollString = diceRoll.concat(modifiers).join(" ");
    return RemoveTrailingOperation(rollString);
}

export function HumanReadableEffectString(character: ICharacter, rollable: IRollable)
{
    var parts = rollable.action_effect.split(";").filter(a => !a);

    var grouped = _.chain(parts).groupBy(p => p.split(" ")[2]);
    var condensedList = grouped.keys().map(k => {
        var roll = grouped.get(k).map(p => p.split(" ").slice(0,2)).map(p => p.join(""));
        var finalVal = roll.value().reduce((acc, x) => {
            return acc + SubstituteEffectValue(character, x.replace("+", ""))
        }, 0)
        return `${(finalVal >= 0 ? "+" : "-")} ${Math.abs(finalVal)} ${k}`;
    })

    return condensedList.map(m => {
        var parts = m.toUpperCase().split(" ");
        return parts.join(" ");
    }).join(" ");
}