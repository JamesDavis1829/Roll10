import {Component, ViewEncapsulation} from '@angular/core';


export type PopUpMode = "DiceLog" | "Settings";
@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PopupMenuComponent {
  public mode: PopUpMode = "DiceLog";
  public isMenuShowing = false;

  ToggleMenuShowing()
  {
    this.isMenuShowing = !this.isMenuShowing;
  }
}
