import {Component, OnInit} from '@angular/core';
import {ICharacter} from "../../domain/data/Character";
import {ICharacterAction} from "../../domain/data/CharacterAction";
import PocketBase from "pocketbase";
import {PocketBaseService} from "../pocket-base.service";

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
    [this.characters, this.actions] = await Promise.all([
      this.pb.GetFullList<ICharacter>("characters","","","spells,equipment,inventory,actions"),
      this.pb.GetFullList<ICharacterAction>("actions", "+created", "all_characters=true")
    ])
    this.characters = this.characters.map(c => {
      return { ...c, hp: c.durability, current_stamina: c.stamina };
    })
  }
}
