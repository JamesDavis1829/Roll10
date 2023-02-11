import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/domain/data/User';
import { GenerateId, Nullable } from 'src/Helpers';
import { match } from 'ts-pattern';
import { DiceLogService } from '../dice-log.service';
import { PocketBaseService } from '../pocket-base.service';
import { ToastService } from '../toast.service';
import {IDiceRoom} from "../../domain/data/DiceRoom";

@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css']
})
export class SettingsMenuComponent implements OnInit, OnDestroy {
  public currentUser: Nullable<IUser> = null;
  private subs: Subscription[] = [];
  private isLoading = false;

  public idEntry = new FormControl("");

  constructor(
    private pb: PocketBaseService,
    private diceLog: DiceLogService,
    private toastService: ToastService
  )
  {
    this.idEntry.addValidators([Validators.required,Validators.pattern(/[a-z0-9]{15}/)])
  }

  async HandleSubmit()
  {
    if(this.idEntry.valid)
    {
      this.isLoading = true;
      await this.UpdateDiceRoom(this.idEntry.value!);
      this.isLoading = false;
    }
  }

  async UpdateDiceRoom(roomId: string)
  {
    let result = await this.pb.UpdateItem<IUser>("users", this.currentUser?.id ?? "" , { diceroom: roomId })
    await this.pb.UpdateUser();
    match(result)
      .with(true, () => { this.toastService.ShowToast({ id:GenerateId(), message:"Dice room updated!.", type:'Info' })})
      .with(false, () => { this.toastService.ShowToast({ id:GenerateId(), message:"Dice room could not be updated.", type:'Warning' })})
      .exhaustive();
  }

  async CreateNewDiceRoom()
  {
    this.isLoading = true;
    let id = GenerateId();
    let result = await this.pb.CreateItem<IDiceRoom>("dicerooms",{ id, name: id });
    match(result)
      .with(true, () => {this.toastService.ShowToast({id: GenerateId(), message: "Created a new dice room.", type: 'Info'})})
      .with(false, () => {this.toastService.ShowToast({id: GenerateId(), message: "Could not create dice room.", type: 'Warning'})})
      .exhaustive()

    if(result)
    {
      await this.UpdateDiceRoom(id);
    }

    this.isLoading = false;
  }

  Logout()
  {
    this.diceLog.ClearLog();
    this.pb.Logout();
  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }
  ngOnInit(): void {
    this.subs.push(this.pb.userSubject.subscribe(u => {
      this.currentUser = u;
      this.idEntry.setValue(this.currentUser?.diceroom ?? "");
    }));
  }
}
