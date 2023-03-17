import {AfterViewInit, ChangeDetectorRef, Component, Renderer2, ViewChild} from '@angular/core';
import {DiceLogService} from "../dice-log.service";
import {Delay} from "../../Helpers";

@Component({
  selector: 'app-dice-log',
  templateUrl: './dice-log.component.html',
  styleUrls: ['./dice-log.component.css']
})
export class DiceLogComponent {
  constructor(public diceLogService: DiceLogService)
  {
  }
}
