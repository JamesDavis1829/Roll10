import {Component, OnInit} from '@angular/core';
import {ICharacter} from "../../domain/data/Character";
import {ICharacterAction} from "../../domain/data/CharacterAction";
import {PocketBaseService} from "../pocket-base.service";
import {IDSLEquation} from "../../domain/data/DSLEquation";
import {EvaluateDSL} from "../../domain/dsl/DSL";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit{
  characters:Array<ICharacter> = [];
  actions:Array<ICharacterAction> = [];

  constructor(private pb: PocketBaseService) {

  }

  ngOnInit(): void {
    this.Initialize().catch(e => console.error(e));
  }

  async Initialize()
  {
    let equations: IDSLEquation[];
    [this.characters, this.actions,equations] = await Promise.all([
      this.pb.GetFullList<ICharacter>("characters","","","spells,equipment,inventory,actions"),
      this.pb.GetFullList<ICharacterAction>("actions", "+created", "all_characters=true"),
      this.pb.GetFullList<IDSLEquation>("dslequations")
    ])

    let staEquation:IDSLEquation = equations.find(he => he.id == "hvk4ebqxzgsvlk8") ?? { id:"", equation: "", name: "" };
    let hpEquation:IDSLEquation = equations.find(sta => sta.id == "g7328zqjzmfptfl") ?? { id: "", equation: "", name: "" };

    this.characters = this.characters.map(c => {
      let maxHp = EvaluateDSL(c, hpEquation.equation);
      let maxSta = EvaluateDSL(c, staEquation.equation);

      return {
        ...c,
        hp: maxHp.value,
        max_hp: maxHp.value,
        current_stamina: maxSta.value,
        max_stamina: maxSta.value
      }
    })
  }
}
