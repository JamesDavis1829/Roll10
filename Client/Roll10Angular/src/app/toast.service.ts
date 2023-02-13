import { Injectable } from '@angular/core';
import { delay } from 'lodash';
import {from, Observable, of, Subject, Subscription} from 'rxjs';

export type ToastType = "Info" | "Warning";
export interface IToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toastList: IToastMessage[] = [];
  public toastListChangeSubject = new Subject<boolean>();
  constructor() { }

  public async ShowToast(message: IToastMessage, timeout = 5000)
  {
    this.toastList.push(message);
    this.toastListChangeSubject.next(true);
    await new Promise<void>(resolve => setTimeout(() => { resolve() }, timeout));
    this.toastList = this.toastList.filter(t => t.id != message.id);
    this.toastListChangeSubject.next(true);
  }
}
