import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {PocketBaseService} from '../pocket-base.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css','../../assets/main.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class RedirectComponent {

  constructor( private pb: PocketBaseService, private router: Router )
  {
    pb.HandleAuthRedirect()
    .catch(e => {
      console.error(e);
    })
    .finally(() => {
      //Always redirect to base url
      return this.pb.UpdateUser();
    })
    .finally(() => {
      this.router.navigateByUrl!("");
    })
  }

}
