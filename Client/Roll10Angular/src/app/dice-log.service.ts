import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { PocketBaseService } from './pocket-base.service'
import { IDiceLogEntry } from "../domain/data/DiceLogEntry";
import { IToastMessage, ToastService } from './toast.service';
import * as _ from "lodash";
import { GenerateId } from 'src/Helpers';

const collectionName = "diceroomlogs";

export interface IDiceLogPush {
  entry:IDiceLogEntry,
  directPush: boolean
}

@Injectable({
  providedIn: 'root'
})
export class DiceLogService {

  public addDiceLogSubject = new Subject<IDiceLogPush>()
  private hasSynced = false;

  private subs: Subscription[] = [];
  public diceLog: IDiceLogEntry[] = [];

  constructor(
    private pb: PocketBaseService,
    private toast: ToastService
  ) 
  {
    this.subs.push(this.addDiceLogSubject.subscribe(next => {
      this.AddEntry(next);
    }))
  }

  public async SyncDiceLog()
  {
    if(!this.hasSynced)
    {
      let events = await this.pb.GetFullList<IDiceLogEntry>(collectionName);
      let currentIds = this.diceLog.map(d => d.id);
      this.diceLog = _.chain(this.diceLog)
                      .concat(events.filter(e => !currentIds.includes(e.id)))
                      .sortBy("created").value();

      this.hasSynced = true;
    }
  }

  public ClearLog()
  {
    this.hasSynced = false;
    this.diceLog = [];
  }

  private async AddEntry(push: IDiceLogPush)
  {
    let user = this.pb.GetUser();
    if(user?.diceroom && !push.directPush)
    {
      await this.pb.CreateItem(collectionName, {...push.entry, room_id: user.diceroom})
    }

    if(!this.diceLog.map(d => d.id).includes(push.entry.id))
    {
      this.diceLog.push(push.entry);
      let toastMessage:IToastMessage = {
        id: GenerateId(),
        type: 'Info',
        message: `<p class=\"text-center font-bold\">${push.entry.title}</p><p class=\"text-center italic\">${push.entry.diceroll}</p><p class=\"text-center font-bold text-lg\">${push.entry.rolledamount}</p>`
      }
      this.toast.ShowToast(toastMessage);
    }
  }
}
