import {Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Delay} from "../../Helpers";
import {ToastService} from "../toast.service";
import {Subscription} from "rxjs";


export type PopUpMode = "DiceLog" | "Settings";
@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PopupMenuComponent implements OnDestroy{
  public isMenuShowing = false;
  @ViewChild("diceLog")
  diceLog!: ElementRef<HTMLDivElement>;
  subs: Subscription[] = [];

  constructor(private toastService: ToastService)
  {
    this.subs.push(this.toastService.toastListChangeSubject.subscribe(t =>
    {
      Delay(50).then(_ => {
        this.ScrollToBottom();
      })
    }));
  }

  ToggleMenuShowing()
  {
    this.isMenuShowing = !this.isMenuShowing;
    Delay(50).then(_ => {
      this.ScrollToBottom();
    });
  }

  ScrollToBottom()
  {
    if(this?.diceLog?.nativeElement)
      this.diceLog.nativeElement.scrollTop = this.diceLog.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void
  {
    this.subs.map(s => s.unsubscribe());
  }
}
