import * as angu from 'angu'
import {ApplyMaxAndMinimums, ICharacter} from "../data/Character";
import {BaseDice} from "../../Helpers";
import {defaultRollable, PerformRoll} from "../data/Rollable";

type Any = angu.Value;

export type DSLReturn = {
  character: ICharacter,
  value: number
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
  // Put the context behind a function to guarantee that no
  // state is shared between subsequent evaluate calls.
  const ctx: () => angu.Context = () => ({
    scope: {
      'str': (character.strength - BaseDice),
      'agi': (character.agility - BaseDice),
      'dur': (character.durability - BaseDice),
      'sta': (character.stamina - BaseDice),
      'int': (character.intelligence - BaseDice),
      'ins': (character.insight - BaseDice),
      'armor': PerformRoll(character, {
        ...defaultRollable,
        dice_roll: character.equipment.filter(c => c.category == 'armor').map(c => c.dice_roll).join(";"),
        modifiers: character.equipment.filter(c => c.category == 'armor').map(c => c.modifiers).join(";"),
        add_base_dice : false
      }).roll,
      'lvl': character.level,
      'sethp': (a: Any) => {
        mutableCharacter = {...mutableCharacter, hp: a.eval()};
        mutableCharacter = ApplyMaxAndMinimums(mutableCharacter);
      },
      'setsta': (a: Any) => {
        mutableCharacter = {...mutableCharacter, current_stamina: a.eval()};
        mutableCharacter = ApplyMaxAndMinimums(mutableCharacter);
      },
      // Our basic calculator bits from above:
      '-': (a: Any, b: Any) => a.eval() - b.eval(),
      '+': (a: Any, b: Any) => a.eval() + b.eval(),
      '/': (a: Any, b: Any) => a.eval() / b.eval(),
      '*': (a: Any, b: Any) => {
        let aVal = a.eval()
        const bVal = b.eval()
        // Bit of fun; if we pass string * number, repeat string
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
    value: parseInt(roll)
  };
}
