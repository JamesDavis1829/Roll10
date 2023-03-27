import { Component } from '@angular/core';
import {ICharacter} from "../../domain/data/Character";
import {PocketBaseService} from "../pocket-base.service";

@Component({
  selector: 'app-ancestry-list',
  templateUrl: './ancestry-list.component.html',
  styleUrls: ['./ancestry-list.component.css']
})
export class AncestryListComponent {
  public ancestriesList: Array<ICharacter> = [];

  constructor(private pb: PocketBaseService)
  {
    this.AsyncOnInit();
  }

  async AsyncOnInit()
  {
    this.ancestriesList = await this.pb.GetFullList<ICharacter>("characters",undefined, "is_ancestor = true");
  }
}
