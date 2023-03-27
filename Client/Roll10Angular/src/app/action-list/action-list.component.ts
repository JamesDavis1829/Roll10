import { Component } from '@angular/core';
import {IRollable} from "../../domain/data/Rollable";
import {ICharacterAction} from "../../domain/data/CharacterAction";
import PocketBase from "pocketbase";
import {PocketBaseService} from "../pocket-base.service";

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent {
  public actions: Array<ICharacterAction> = [];

  constructor(private pb: PocketBaseService)
  {
    this.AsyncOnInit();
  }

  async AsyncOnInit()
  {
    this.actions = await this.pb.GetFullList<ICharacterAction>("actions");
  }
}
