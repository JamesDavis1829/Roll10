import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms"
import * as _ from "lodash";
import {Clamp} from "../../Helpers";

const minStatValue = 8;
const maxStatValue = 20;

const maxPoints = 15;

const doubleCostCutOff = 12;
@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css']
})
export class CharacterCreationComponent {
  characterPoints = new FormGroup({
    str: new FormControl(minStatValue, this.GetValidators()),
    agi: new FormControl(minStatValue, this.GetValidators()),
    dur: new FormControl(minStatValue, this.GetValidators()),
    sta: new FormControl(minStatValue, this.GetValidators()),
    int: new FormControl(minStatValue, this.GetValidators()),
    ins: new FormControl(minStatValue, this.GetValidators()),
    points: new FormControl(15, [Validators.min(0), Validators.max(maxPoints)])
  })

  private GetValidators()
  {
    return [Validators.required, Validators.min(minStatValue)];
  }

  OnSubmit()
  {

  }

  private CalculatePoints()
  {
    let pointsSpent = _.chain(['str','agi','dur','sta','int','ins'])
      .map(f => this.characterPoints.get(f))
      .map(f => {
        let pointsAboveCutoff = Clamp(f?.value - doubleCostCutOff, 0, Number.MAX_VALUE);
        let pointsBelowCutoff = Clamp(f?.value - minStatValue,0, (doubleCostCutOff - minStatValue));
        return pointsAboveCutoff * 2 + pointsBelowCutoff;
      })
      .sum()
      .value();
    this.characterPoints.controls.points.setValue(maxPoints - pointsSpent);
  }

  public ChangeControlValue(control: FormControl<number | null>, addition:number)
  {
    let value = control.value ?? 0;
    control.setValue(Clamp(value + addition, minStatValue, maxStatValue));
    this.CalculatePoints();
  }
}
