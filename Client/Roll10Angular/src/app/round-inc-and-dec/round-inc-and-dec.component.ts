import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-round-inc-and-dec',
  templateUrl: './round-inc-and-dec.component.html',
  styleUrls: ['./round-inc-and-dec.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
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
      'round-counter': true,
      [this.Color]: true
    }
  }
}
