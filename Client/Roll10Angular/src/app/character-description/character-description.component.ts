import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ApplyEffect, defaultCharacter, ICharacter, StatOperands} from "../../domain/data/Character";
import {ICharacterAction} from "../../domain/data/CharacterAction";
import {CharacterStats, GenerateId} from "../../Helpers";
import {defaultRollable, IRollable} from "../../domain/data/Rollable";
import {DiceLogService} from "../dice-log.service";
import {HideDiceRoll} from "../../domain/data/Item";
import {EvaluateDSL} from "../../domain/dsl/DSL";

@Component({
  selector: 'app-character-description',
  templateUrl: './character-description.component.html',
  styleUrls: ['./character-description.component.css', '../../assets/main.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CharacterDescriptionComponent implements OnInit {

  @Input()
  character: ICharacter = {...defaultCharacter};
  @Input()
  allCharacterActions: Array<ICharacterAction> = [];
  targetCharacter: ICharacter = {...defaultCharacter};

  hideDiceRoll = HideDiceRoll;

  constructor(public diceLogService: DiceLogService) {
  }

  public GetStats()
  {
    return CharacterStats(this.targetCharacter);
  }

  ngOnInit(): void {
    this.targetCharacter = {...this.character};
  }

  public RollDice(item: IRollable)
  {
    let results = EvaluateDSL(this.targetCharacter, item.dslEquation);
    this.targetCharacter = results.character;
    this.diceLogService.addDiceLogSubject.next({
      directPush: false, entry: {
        title: `${this.targetCharacter.name} - ${item.name}`,
        rolledamount: results.value,
        diceroll: results.rollString,
        room_id: "",
        id: GenerateId(),
        description: item.description
      }
    })
  }

  public ResetCharacter()
  {
    this.targetCharacter = {...this.character};
  }

  public ApplyStatOperation(op:number, stat: StatOperands)
  {
    this.targetCharacter = ApplyEffect(this.targetCharacter, op, stat);
  }

  public RollStat(stat: string, name: string) {
    let statRoll: IRollable = {
      ...defaultRollable,
      name: `${name} Roll`,
      dslEquation:`roll(1,10) + ${stat}()`
    };
    this.RollDice(statRoll);
  }
}
