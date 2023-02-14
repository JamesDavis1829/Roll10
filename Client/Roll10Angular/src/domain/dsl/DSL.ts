import * as angu from 'angu'
import {ApplyMaxAndMinimums, ICharacter} from "../data/Character";
import {BaseDice} from "../../Helpers";
import {DiceSubstitute} from "../data/Rollable";
import * as _ from "lodash";
import {match} from "ts-pattern";

type Any = angu.Value;

export type DSLReturn = {
  character: ICharacter,
  value: number,
  rollString: string
}
export function EvaluateDSL(character:ICharacter, evaluationString: string)
{
  return basicLanguage(character, evaluationString);
}

/**
 * Build a very simple expression based language with assignment,
 * semicolon separated expressions and some operators and functions.
 */
export function basicLanguage (character:ICharacter, dslString: string) : DSLReturn {

  let mutableCharacter = {...character};
  let diceRolls:{diceString: string, rolledValue: number}[] = [];
  let rollStat = (stat: number, name: string) => {
    diceRolls.push({
      rolledValue: stat,
      diceString: name
    })
    return stat
  }
  // Put the context behind a function to guarantee that no
  // state is shared between subsequent evaluate calls.
  const ctx: () => angu.Context = () => ({
    scope: {
      'str': () => rollStat(character.strength - BaseDice, "STR"),
      'agi': () => rollStat(character.agility - BaseDice, "AGI"),
      'dur': () => rollStat(character.durability - BaseDice, "DUR"),
      'sta': () => rollStat(character.stamina - BaseDice, "STA"),
      'int': () => rollStat(character.intelligence - BaseDice, "INT"),
      'ins': () => rollStat(character.insight - BaseDice, "INS"),
      'armor': () => {
        let armor = _.chain(character.equipment)
          .filter(c => c.category == 'armor')
          .map(a => EvaluateDSL(character, a.dslEquation))
          .map(r => r.value)
          .sum()
          .value();
        return rollStat(armor, "ARMOR");
      },
      'lvl': () => rollStat(character.level,"LVL"),
      'sethp': (a: Any) => {
        mutableCharacter = {...mutableCharacter, hp: a.eval()};
        mutableCharacter = ApplyMaxAndMinimums(mutableCharacter);
      },
      'setsta': (a: Any) => {
        mutableCharacter = {...mutableCharacter, current_stamina: a.eval()};
        mutableCharacter = ApplyMaxAndMinimums(mutableCharacter);
      },
      'addsta': (a: Any) => {
        mutableCharacter = {...mutableCharacter, current_stamina: mutableCharacter.current_stamina + a.eval() };
        mutableCharacter = ApplyMaxAndMinimums(mutableCharacter);
      },
      'addhp': (a: Any) => {
        mutableCharacter = {...mutableCharacter, hp: mutableCharacter.hp + a.eval()};
        mutableCharacter = ApplyMaxAndMinimums(mutableCharacter);
      },
      'roll': (a: Any, b: Any) => {
        let diceString = `${a.eval()}d${b.eval()}`;
        let roll = DiceSubstitute(diceString);
        diceRolls.push({
          rolledValue: roll,
          diceString
        })
        return roll;
      },
      'const': (a: Any) => {
        let value = a.eval();
        diceRolls.push({
          rolledValue: value,
          diceString: value.toString()
        })
        return value;
      },
      'castermod': () => match(character.caster_type)
          .with("none", () => 0)
          .with("quarter", () => 1)
          .with("half", () => 2)
          .with("full", () => 3)
          .exhaustive(),
      '-': (a: Any, b: Any) => a.eval() - b.eval(),
      '+': (a: Any, b: Any) => a.eval() + b.eval(),
      '/': (a: Any, b: Any) => a.eval() / b.eval(),
      '*': (a: Any, b: Any) => {
        let aVal = a.eval()
        const bVal = b.eval()
        //if we pass string * number, repeat string
        // that number of times:
        if (typeof aVal === 'string') {
          const t = aVal
          for(let i = 1; i < bVal; i++) aVal += t
          return aVal
        }
        // Else, just assume both are numbers and multiply them:
        else {
          return a.eval() * b.eval()
        }
      },
      // Let's allow multiple expressions, separated by ';':
      ';': (a: Any, b: Any) => { a.eval(); return b.eval() },
      // we can access the kind and name of input args. This
      // allows us to do things like variable assignment:
      '=': function(a: Any, b: Any) {
        const resB = b.eval()
        if (a.kind() === 'variable') {
          this['context'].scope[a.name()] = resB
        } else {
          throw Error(`Assignment expected a variable on the left but got a ${a.kind()}`)
        }
        return resB
      },
    },
    // first in this list = first to be evaluated:
    precedence: [
      ['/', '*'],
      ['-', '+'],
      { ops: ['='], associativity: 'right' },
      [';']
    ]
  })

  let roll = angu.evaluate(dslString.toLowerCase(), ctx()).value;

  return {
    character: mutableCharacter,
    value: parseInt(roll),
    rollString: diceRolls.map(dR => `${dR.diceString}(${dR.rolledValue})`).join(" + ")
  };
}
