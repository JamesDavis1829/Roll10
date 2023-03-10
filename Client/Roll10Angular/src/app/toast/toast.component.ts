import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ToastService} from '../toast.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ToastComponent implements OnInit, OnDestroy{
  subs: Array<Subscription> = [];
  constructor(public toastService: ToastService, private changeRef: ChangeDetectorRef)
  {
  }

  ngOnDestroy(): void
  {
    this.subs.map(s => s.unsubscribe());
  }

  ngOnInit(): void
  {
    this.subs.push(this.toastService.toastListChangeSubject.subscribe(_ => {
      this.changeRef.detectChanges();
    }))
  }
}
