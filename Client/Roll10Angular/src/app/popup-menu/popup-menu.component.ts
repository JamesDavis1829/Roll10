import {Component, ViewEncapsulation} from '@angular/core';
import {match} from "ts-pattern";


export type PopUpMode = "DiceLog" | "Settings";
@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.css', '../../assets/main.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PopupMenuComponent {
  public mode: PopUpMode = "DiceLog";
  public isMenuShowing = false;

  ToggleMenuShowing()
  {
    this.isMenuShowing = !this.isMenuShowing;
  }

  ChangeMode(mode: PopUpMode)
  {
    this.mode = mode;
  }

  GetTitle()
  {
    return match(this.mode)
      .with("DiceLog", () => "Dice Log")
      .with("Settings", () => "Settings")
      .exhaustive();
  }
}
