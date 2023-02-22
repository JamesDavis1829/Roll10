import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms"
import * as _ from "lodash";
import {Clamp, GenerateId} from "../../Helpers";
import {PocketBaseService} from "../pocket-base.service";
import {IDSLEquation} from "../../domain/data/DSLEquation";
import {defaultCharacter, ICharacter} from "../../domain/data/Character";
import {EvaluateDSL} from "../../domain/dsl/DSL";

const minStatValue = 8;
const maxStatValue = 20;

const minLevel = 1;
//later will be 10 when feats are implemented
const maxLevel = 2;

const maxPoints = 15;

const doubleCostCutOff = 12;
@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css']
})
export class CharacterCreationComponent {
  maxLevel = maxLevel;
  levelKeys = [...Array(maxLevel).keys()].map(k => k + 1);
  shadowCharacter: ICharacter = {...defaultCharacter, id: GenerateId()};
  characterPoints = new FormGroup({
    level: new FormControl(minLevel, [Validators.required, Validators.min(minLevel), Validators.max(maxLevel)]),
    str: new FormControl(minStatValue, this.GetValidators()),
    agi: new FormControl(minStatValue, this.GetValidators()),
    dur: new FormControl(minStatValue, this.GetValidators()),
    sta: new FormControl(minStatValue, this.GetValidators()),
    int: new FormControl(minStatValue, this.GetValidators()),
    ins: new FormControl(minStatValue, this.GetValidators()),
    points: new FormControl(15, [Validators.min(0), Validators.max(maxPoints)])
  })

  hpEquation!: IDSLEquation;
  staEquation!: IDSLEquation;

  constructor(private pb: PocketBaseService)
  {
    this.OnInitAsync();
  }

  public async OnInitAsync()
  {
    let equations = await this.pb.GetFullList<IDSLEquation>("dslequations");
    this.staEquation = equations.find(he => he.id == "hvk4ebqxzgsvlk8") ?? { id:"", equation: "", name: "" };
    this.hpEquation = equations.find(sta => sta.id == "g7328zqjzmfptfl") ?? { id: "", equation: "", name: "" };
    this.FillInCharacter();
  }

  private GetValidators()
  {
    return [Validators.required, Validators.min(minStatValue)];
  }

  OnSubmit()
  {

  }

  public CalculatePoints()
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
    this.FillInCharacter();
  }

  private FillInCharacter()
  {
    this.shadowCharacter.stamina = this.characterPoints.controls.sta.value ?? 0;
    this.shadowCharacter.level = this.characterPoints.controls.level.value ?? 0;
    this.shadowCharacter.insight = this.characterPoints.controls.ins.value ?? 0;
    this.shadowCharacter.intelligence = this.characterPoints.controls.int.value ?? 0;
    this.shadowCharacter.agility = this.characterPoints.controls.agi.value ?? 0;
    this.shadowCharacter.strength = this.characterPoints.controls.str.value ?? 0;
    this.shadowCharacter.durability = this.characterPoints.controls.dur.value ?? 0;

    this.shadowCharacter.max_hp = EvaluateDSL(this.shadowCharacter, this.hpEquation.equation).value;
    this.shadowCharacter.max_stamina = EvaluateDSL(this.shadowCharacter, this.staEquation.equation).value;
  }

  public ChangeControlValue(control: FormControl<number | null>, addition:number)
  {
    let value = control.value ?? 0;
    control.setValue(Clamp(value + addition, minStatValue, maxStatValue));
    this.CalculatePoints();
  }
}
