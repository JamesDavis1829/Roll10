import {Component, OnDestroy, OnInit} from '@angular/core';
import {PocketBaseService} from "./pocket-base.service";
import {Subscription} from "rxjs";
import {DiceLogService} from "./dice-log.service";
import {ForceCast} from "../Helpers";
import {IDiceLogEntry} from "../domain/data/DiceLogEntry";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  private subs: Subscription[] = [];

  constructor(private pb: PocketBaseService, private diceLogService: DiceLogService) {
    this.pb.UpdateUser().catch(e => console.error(e));
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subs.push(this.pb.userSubject.subscribe(u => {
      if(u?.diceroom)
      {
        this.InitializeDiceLog().catch(e => console.error(e));
      }
    }));
  }

  async InitializeDiceLog()
  {
    this.diceLogService.ClearLog();
    await this.diceLogService.SyncDiceLog();
    await this.pb.SubscribeTo("diceroomlogs","*", async (r) => {
      let diceLog = ForceCast<IDiceLogEntry>(r);
      this.diceLogService.addDiceLogSubject.next({entry: diceLog, directPush: true});
    })
  }
}
