import { Component } from '@angular/core';
import {DiceLogService} from "../dice-log.service";

@Component({
  selector: 'app-dice-log',
  templateUrl: './dice-log.component.html',
  styleUrls: ['./dice-log.component.css']
})
export class DiceLogComponent {

  constructor(public diceLogService: DiceLogService) {
  }
}
