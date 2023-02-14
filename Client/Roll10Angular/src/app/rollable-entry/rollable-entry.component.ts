import {Component, Input} from '@angular/core';
import {defaultCharacter, ICharacter} from "../../domain/data/Character";
import {
  defaultRollable, HumanReadableDSLEffectString,
  IRollable
} from "../../domain/data/Rollable";

@Component({
  selector: 'app-rollable-entry',
  templateUrl: './rollable-entry.component.html',
  styleUrls: ['./rollable-entry.component.css']
})
export class RollableEntryComponent {
  @Input()
  name = "";
  @Input()
  character: ICharacter = {...defaultCharacter};
  @Input()
  item: IRollable = {...defaultRollable};
  @Input()
  rollDice: Function = () => { console.warn("Roll Dice is being called with default")};
  @Input()
  hideDiceRoll = false;
  humanReadableEffectString = HumanReadableDSLEffectString;
}
