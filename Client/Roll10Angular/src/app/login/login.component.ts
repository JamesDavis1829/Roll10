import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthMethodsList, AuthProviderInfo} from 'pocketbase';
import {PocketBaseService} from '../pocket-base.service';
import * as _ from "lodash";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoginComponent implements OnInit {
  public authMethods: AuthMethodsList = {
    authProviders: [],
    usernamePassword: false,
    emailPassword: false
  };

  constructor(private pb: PocketBaseService)
  {

  }

  async ngOnInit() {
    this.authMethods = await this.pb.getAuthOptions();
  }

  public ToTitleCase(text: string)
  {
    return _.startCase(text);
  }

  public LoginWithOption(info: AuthProviderInfo)
  {
    window.localStorage.setItem("provider",JSON.stringify(info));
    let origin = window.location.origin
    console.log(`${info.authUrl}${origin}/redirect`);
    window.open(`${info.authUrl}${origin}/redirect`,"_self")
  }
}
