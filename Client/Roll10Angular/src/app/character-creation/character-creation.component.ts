import {Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms"
import * as _ from "lodash";
import {
  CharacterStatOption,
  characterStatOptions,
  CharacterStats,
  Clamp,
  GenerateId,
  Selectable
} from "../../Helpers";
import {PocketBaseService} from "../pocket-base.service";
import {IDSLEquation} from "../../domain/data/DSLEquation";
import {casterOptions, CasterType, defaultCharacter, ICharacter} from "../../domain/data/Character";
import {EvaluateDSL} from "../../domain/dsl/DSL";
import {match} from "ts-pattern";
import {IItem} from "../../domain/data/Item";
import {ISpell} from "../../domain/data/Spell";
import {IRollable} from "../../domain/data/Rollable";
import {Router} from "@angular/router";

const minStatValue = 0;
const maxStatValue = 5;

const minLevel = 1;
//later will be 10 when feats are implemented
const maxLevel = 3;

const maxPoints = 15;

const doubleCostCutOff = 4;
@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CharacterCreationComponent {
  characterId = GenerateId();
  maxLevel = maxLevel;
  casterOptions = casterOptions;
  baseCharacters: ICharacter[] = [];
  selectedBaseCharacter: ICharacter = {...defaultCharacter};
  levelKeys = [...Array(maxLevel).keys()].map(k => k + 1);
  shadowCharacter: ICharacter = {...defaultCharacter, id: this.characterId};
  characterCreationForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    level: new FormControl(minLevel, [Validators.required, Validators.min(minLevel), Validators.max(maxLevel)]),
    ancestry: new FormControl<ICharacter>(this.baseCharacters[0], [Validators.required]),
    casterType: new FormControl<CasterType>("none", Validators.required),
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
  isLoading = true;

  constructor(private pb: PocketBaseService, private router: Router )
  {
    this.OnInitAsync();
  }

  public async OnInitAsync()
  {
    //TODO: Parallelize requests
    let equations = await this.pb.GetFullList<IDSLEquation>("dslequations");
    this.staEquation = equations.find(he => he.id == "hvk4ebqxzgsvlk8") ?? { id:"", equation: "", name: "" };
    this.hpEquation = equations.find(sta => sta.id == "g7328zqjzmfptfl") ?? { id: "", equation: "", name: "" };
    this.spellChoices = await this.pb.GetFullList<ISpell>("spells")
    this.itemChoices = await this.pb.GetFullList<IItem>("items");
    this.baseCharacters = await this.pb.GetFullList<ICharacter>("characters",undefined,"is_ancestor=true");
    this.SetBaseCharacter(this.baseCharacters[0]);
    this.characterCreationForm.controls.ancestry.setValue(this.selectedBaseCharacter);

    this.FillInCharacter();
    this.isLoading = false;
  }

  private SetBaseCharacter(character: ICharacter)
  {
    this.selectedBaseCharacter = character
    this.shadowCharacter = {...character, is_ancestor: false, id: this.characterId, ancestor: this.selectedBaseCharacter.id};
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
      return;
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
        .then(success => {
          if(success)
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
    return this.characterCreationForm.valid && (this.characterCreationForm.controls.points.value ?? 1) == 0
  }

  public OnFormChange()
  {
    this.SetBaseCharacter(this.characterCreationForm.controls.ancestry.value ?? defaultCharacter);
    let pointsSpent = _.chain(['str','agi','dur','sta','int','ins'])
      .map(f => this.characterCreationForm.get(f))
      .map(f => {
        let pointsAboveCutoff = Clamp(f?.value - doubleCostCutOff, 0, Number.MAX_VALUE);
        let pointsBelowCutoff = Clamp(f?.value - minStatValue,0, (doubleCostCutOff - minStatValue));
        return pointsAboveCutoff * 2 + pointsBelowCutoff;
      })
      .sum()
      .value();
    this.characterCreationForm.controls.points.setValue(maxPoints - pointsSpent);
    this.FillInCharacter();
  }

  private FillInCharacter()
  {
    this.shadowCharacter.stamina += this.characterCreationForm.controls.sta.value ?? 0;
    this.shadowCharacter.level = this.characterCreationForm.controls.level.value ?? 0;
    this.shadowCharacter.insight += this.characterCreationForm.controls.ins.value ?? 0;
    this.shadowCharacter.intelligence += this.characterCreationForm.controls.int.value ?? 0;
    this.shadowCharacter.agility += this.characterCreationForm.controls.agi.value ?? 0;
    this.shadowCharacter.strength += this.characterCreationForm.controls.str.value ?? 0;
    this.shadowCharacter.durability += this.characterCreationForm.controls.dur.value ?? 0;
    this.shadowCharacter.name = this.characterCreationForm.controls.name.value ?? "";
    this.shadowCharacter.caster_type = this.characterCreationForm.controls.casterType.value ?? "none";

    if(this.shadowCharacter.level >= 3)
    {
      this.shadowCharacter = this.AddStatToCharacter(this.shadowCharacter, this.abiThirdLevel.controls[`abi-3-1`].value ?? "Strength")
      this.shadowCharacter = this.AddStatToCharacter(this.shadowCharacter, this.abiThirdLevel.controls[`abi-3-2`].value ?? "Strength")
    }

    this.shadowCharacter.max_hp = EvaluateDSL(this.shadowCharacter, this.hpEquation.equation).value;
    this.shadowCharacter.max_stamina = EvaluateDSL(this.shadowCharacter, this.staEquation.equation).value;
  }

  public ChangeControlValue(control: FormControl<number | null>, addition:number)
  {
    let value = control.value ?? 0;
    control.setValue(Clamp(value + addition, minStatValue, maxStatValue));
    this.OnFormChange();
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

  public TitleCase(val: string)
  {
    return _.startCase(val);
  }
}
