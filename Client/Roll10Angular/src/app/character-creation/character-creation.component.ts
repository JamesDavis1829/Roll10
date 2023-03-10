import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms"
import * as _ from "lodash";
import {CharacterStatOption, characterStatOptions, CharacterStats, Clamp, GenerateId, Selectable} from "../../Helpers";
import {PocketBaseService} from "../pocket-base.service";
import {IDSLEquation} from "../../domain/data/DSLEquation";
import {defaultCharacter, ICharacter} from "../../domain/data/Character";
import {EvaluateDSL} from "../../domain/dsl/DSL";
import {match} from "ts-pattern";
import {AncestryOption, ancestryOptions} from "../../domain/data/Ancestries";
import {IItem} from "../../domain/data/Item";
import {ISpell} from "../../domain/data/Spell";
import {IRollable} from "../../domain/data/Rollable";
import {Router} from "@angular/router";

const minStatValue = 8;
const maxStatValue = 13;

const minLevel = 1;
//later will be 10 when feats are implemented
const maxLevel = 3;

const maxPoints = 15;

const doubleCostCutOff = 12;
@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CharacterCreationComponent {
  maxLevel = maxLevel;
  levelKeys = [...Array(maxLevel).keys()].map(k => k + 1);
  shadowCharacter: ICharacter = {...defaultCharacter, id: GenerateId()};
  characterPoints = new FormGroup({
    name: new FormControl("", [Validators.required]),
    level: new FormControl(minLevel, [Validators.required, Validators.min(minLevel), Validators.max(maxLevel)]),
    ancestry: new FormControl<AncestryOption>("Human", [Validators.required]),
    str: new FormControl(minStatValue, this.GetValidators()),
    agi: new FormControl(minStatValue, this.GetValidators()),
    dur: new FormControl(minStatValue, this.GetValidators()),
    sta: new FormControl(minStatValue, this.GetValidators()),
    int: new FormControl(minStatValue, this.GetValidators()),
    ins: new FormControl(minStatValue, this.GetValidators()),
    points: new FormControl(15, [Validators.min(0), Validators.max(maxPoints)]),
  })

  abiThirdLevel = this.GenAbiFormGroup(3);

  characterStats = CharacterStats(defaultCharacter);

  hpEquation!: IDSLEquation;
  staEquation!: IDSLEquation;

  itemChoices: IItem[] = [];
  spellChoices: ISpell[] = [];

  characterStatOptions = characterStatOptions;
  ancestryOptions = ancestryOptions;

  constructor(private pb: PocketBaseService, private router: Router )
  {
    this.OnInitAsync();
  }

  public async OnInitAsync()
  {
    let equations = await this.pb.GetFullList<IDSLEquation>("dslequations");
    this.staEquation = equations.find(he => he.id == "hvk4ebqxzgsvlk8") ?? { id:"", equation: "", name: "" };
    this.hpEquation = equations.find(sta => sta.id == "g7328zqjzmfptfl") ?? { id: "", equation: "", name: "" };
    this.spellChoices = await this.pb.GetFullList<ISpell>("spells")
    this.itemChoices = await this.pb.GetFullList<IItem>("items");
    this.FillInCharacter();
  }

  private GetValidators()
  {
    return [Validators.required, Validators.min(minStatValue)];
  }

  OnSubmit()
  {
    let user = this.pb.GetUser();

    if(user == null)
    {
      window.alert('You must be logged in to create characters');
    }

    if(this.IsFormValid())
    {
      let characterToUpload = {
        ...this.shadowCharacter,
        spells: this.shadowCharacter.spells.map(s => s.id),
        equipment: this.shadowCharacter.equipment.map(s => s.id)
      };
      characterToUpload.owner = user?.id ?? "";
      this.pb.CreateItem<any>("characters",characterToUpload)
        .then(_ => {
          this.router.navigateByUrl!("");
        })
        .catch(e => {
          console.error(e);
          window.alert('Character was not able to be created.')
        })
    }
  }

  public IsFormValid()
  {
    return this.characterPoints.valid && (this.characterPoints.controls.points.value ?? 1) == 0
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
    this.shadowCharacter.name = this.characterPoints.controls.name.value ?? "";

    if(this.shadowCharacter.level >= 3)
    {
      this.shadowCharacter = this.AddStatToCharacter(this.shadowCharacter, this.abiThirdLevel.controls[`abi-3-1`].value ?? "Strength")
      this.shadowCharacter = this.AddStatToCharacter(this.shadowCharacter, this.abiThirdLevel.controls[`abi-3-2`].value ?? "Strength")
    }

    match(this.characterPoints.controls.ancestry.value ?? "Human")
      .with("Dwarven", () => {
        this.shadowCharacter = {...this.shadowCharacter, strength: this.shadowCharacter.strength + 1, durability: this.shadowCharacter.durability + 1}
      })
      .with("Human", () => {
        this.shadowCharacter = {...this.shadowCharacter, stamina: this.shadowCharacter.stamina + 2}
      })
      .with("Halfling", () => {
        this.shadowCharacter = {...this.shadowCharacter, agility: this.shadowCharacter.agility + 1}
      })
      .exhaustive()

    this.shadowCharacter.max_hp = EvaluateDSL(this.shadowCharacter, this.hpEquation.equation).value;
    this.shadowCharacter.max_stamina = EvaluateDSL(this.shadowCharacter, this.staEquation.equation).value;
  }

  public ChangeControlValue(control: FormControl<number | null>, addition:number)
  {
    let value = control.value ?? 0;
    control.setValue(Clamp(value + addition, minStatValue, maxStatValue));
    this.CalculatePoints();
  }

  private GenAbiFormGroup(level: number)
  {
    return new FormGroup({
      [`abi-${level}-1`]: new FormControl<CharacterStatOption>("Strength", [Validators.required]),
      [`abi-${level}-2`]: new FormControl<CharacterStatOption>("Strength", [Validators.required])
    })
  }

  private AddStatToCharacter(character: ICharacter, stat: CharacterStatOption)
  {
    return match(stat)
      .with("Strength", () => { return { ...character, strength: character.strength + 1 }})
      .with("Agility", () => { return {...character, agility: character.agility + 1}})
      .with("Durability", () => { return {...character, durability: character.durability + 1}})
      .with("Insight", () => { return {...character, insight: character.insight + 1}})
      .with("Intelligence", () => { return {...character, intelligence: character.intelligence + 1}})
      .with("Stamina", () => { return {...character, stamina: character.stamina + 1}})
      .exhaustive();
  }

  public AddItemsToCharacter(items: Selectable<IRollable>[])
  {
    this.shadowCharacter.equipment = items.filter(i => i.isSelected).map(i => i.item as IItem);
  }

  public AddSpellsToCharacter(spells: Selectable<IRollable>[])
  {
    this.shadowCharacter.spells = spells.filter(i => i.isSelected).map(i => i.item as ISpell);
  }
}
