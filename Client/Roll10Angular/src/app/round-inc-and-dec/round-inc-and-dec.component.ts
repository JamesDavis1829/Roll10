import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-round-inc-and-dec',
  templateUrl: './round-inc-and-dec.component.html',
  styleUrls: ['./round-inc-and-dec.component.css']
})
export class RoundIncAndDecComponent {
  @Input()
  Id: string = "";
  @Input()
  Color: string = "";
  @Input()
  Name: string = "";
  @Input()
  Title: string = "";
  @Input()
  Value: number = 0;
  @Output()
  Increment = new EventEmitter();
  @Output()
  Decrement = new EventEmitter();
  @Input()
  HideButtons = true;

  GetTopLevelCss()
  {
    return {
      'relative w-20 h-20 m-5 rounded-full border-4 text-white shadow-lg shadow-slate-800': true,
      [this.Color]: true
    }
  }
}
