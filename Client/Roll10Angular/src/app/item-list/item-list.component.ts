import { Component } from '@angular/core';
import {IItem} from "../../domain/data/Item";
import {PocketBaseService} from "../pocket-base.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  public itemList: Array<IItem> = [];

  constructor(private pb: PocketBaseService)
  {
    this.AsyncOnInit();
  }

  async AsyncOnInit()
  {
    this.itemList = await this.pb.GetFullList<IItem>("items", "+name");
  }

  ToTitleCase(val: string)
  {
    return _.startCase(val);
  }

  Tags(item:IItem)
  {
    return _.chain([item.category,item.wield, item.weight])
      .flatten()
      .compact()
      .map(v => _.startCase(v))
      .join(' | ')
      .value()
  }
}


