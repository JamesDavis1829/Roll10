import {Component, Input, OnInit} from '@angular/core';
import {ApplyEffect, ApplyEffects, defaultCharacter, ICharacter, StatOperands} from "../../domain/data/Character";
import {ICharacterAction} from "../../domain/data/CharacterAction";
import {GenerateId, Nullable} from "../../Helpers";
import {IRollable, PerformRoll} from "../../domain/data/Rollable";
import {DiceLogService} from "../dice-log.service";
import { HideDiceRoll } from "../../domain/data/Item";

@Component({
  selector: 'app-character-description',
  templateUrl: './character-description.component.html',
  styleUrls: ['./character-description.component.css']
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
    return [
      {name: "Strength", abbreviation: "STR", stat: this.targetCharacter.strength},
      {name: "Agility", abbreviation: "AGI", stat: this.targetCharacter.agility},
      {name: "Durability", abbreviation: "DUR", stat: this.targetCharacter.durability},
      {name: "Stamina", abbreviation: "STA", stat: this.targetCharacter.stamina},
      {name: "Intelligence", abbreviation: "INT", stat: this.targetCharacter.intelligence},
      {name: "Insight", abbreviation: "INS", stat: this.targetCharacter.insight}
    ]
  }

  ngOnInit(): void {
    this.targetCharacter = {...this.character};
  }

  public RollDice(item: IRollable)
  {
    let results = PerformRoll(this.targetCharacter, item);
    this.diceLogService.addDiceLogSubject.next({
      directPush: false, entry: {
        title: `${this.targetCharacter.name} - ${item.name}`,
        rolledamount: results.roll,
        diceroll: results.rollString,
        room_id: "",
        id: GenerateId()
      }
    });

    this.targetCharacter = ApplyEffects(this.targetCharacter, item.action_effect);
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
      id: "",
      name: `${name} Roll`,
      modifiers: `+ ${stat}`,
      action_effect: "",
      add_base_dice: true,
      dice_roll: ""
    };
    this.RollDice(statRoll);
  }
}
