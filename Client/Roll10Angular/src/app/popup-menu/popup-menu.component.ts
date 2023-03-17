import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Delay} from "../../Helpers";


export type PopUpMode = "DiceLog" | "Settings";
@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PopupMenuComponent {
  public isMenuShowing = false;
  @ViewChild("diceLog")
  diceLog!: ElementRef<HTMLDivElement>;

  ToggleMenuShowing()
  {
    this.isMenuShowing = !this.isMenuShowing;
    Delay(50).then(_ => {
      if(this?.diceLog?.nativeElement)
        this.diceLog.nativeElement.scrollTop = this.diceLog.nativeElement.scrollHeight;
    });
  }
}
