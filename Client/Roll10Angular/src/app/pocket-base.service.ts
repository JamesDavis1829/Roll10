import {Injectable} from '@angular/core';
import PocketBase, {Admin, Record} from "pocketbase";
import {BehaviorSubject} from 'rxjs';
import {Url} from 'src/Configuration';
import {ForceCast, Nullable} from 'src/Helpers';
import {IUser} from "../domain/data/User";

export interface IAuthOptions {
  authUrl: string
  codeChallenge: string
  codeChallengeMethod: string
  codeVerifier: string
  name: string
  stat: string
}

@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {

  private pb = new PocketBase(Url);
  public userSubject = new BehaviorSubject<Nullable<IUser>>(null);
  public callbacks: {
    [key: string]: (event: Record) => Promise<void>
  } = {};

  constructor() { }

  public async getAuthOptions()
  {
    return await this.pb.collection('users').listAuthMethods()
  }

  public GetUser():Nullable<IUser>
  {
    let model = this.pb.authStore.model;
    if(model == null)
      return null;

    if(model instanceof Admin)
    {
      //no admin should login
      this.Logout();
      throw new Error("Admin is not allowed to login");
    }

    return ForceCast<IUser>(model);
  }

  public async UpdateUser()
  {
    try
    {
      let newUser = await this.pb.collection("users").authRefresh();
      this.userSubject.next(ForceCast<IUser>(newUser.record));
    }
    catch(e)
    {
      console.error(e);
      this.userSubject.next(null);
    }
  }

  public async GetFullList<T>(collectionName: string, sort = "+created", filter = "", expand = "")
  {
    try
    {
        let list = await this.pb.collection(collectionName).getFullList(200, {
            sort,
            filter,
            expand
        });
        let expandList = (expand || "").split(",");
        return list.map(l => {
          for (let entry of expandList) {
            if (l["expand"][entry]) {
              l[entry] = l["expand"][entry]
            } else {
              l[entry] = [];
            }
          }
          return l;
        }).map(l => ForceCast<T>(l));
    }
    catch(e)
    {
        console.error(e);
        return [];
    }
  }

  public async CreateItem<T extends {}>(collection: string, item: Partial<T>)
  {
    try
    {
      await this.pb.collection(collection).create(item);
      return true;
    }
    catch(e)
    {
      console.error(e);
      return false;
    }
  }

  public async UpdateItem<T>(collection: string, recordId: string, patchParams: Partial<T>)
  {
    try
    {
      await this.pb.collection(collection).update(recordId, patchParams);
      return true;
    }
    catch(e)
    {
      console.error(e);
      return false;
    }
  }

  public Logout()
  {
    this.pb.authStore.clear();
    this.userSubject.next(null);
  }

  public async SubscribeTo(collection: string, pattern: string, callback: (event: Record) => Promise<void>)
  {
    this.callbacks[collection] = callback;
    this.pb.collection(collection).subscribe(pattern, (e) => {
      this.callbacks[collection](e.record);
    });
  }

  public async HandleAuthRedirect()
  {
    const redirectUrl = window.location.origin + '/redirect';

    // parse the query parameters from the redirected url
    const params = (new URL(window.location.toString())).searchParams;

    // load the previously stored provider's data
    const provider = JSON.parse(localStorage.getItem('provider') ?? "{}")

    // compare the redirect's state param and the stored provider's one
    if (provider.state !== params.get('state')) {
        throw "State parameters don't match.";
    }

    // authenticate
    return this.pb.collection('users').authWithOAuth2(
        provider.name,
        params.get('code') ?? "",
        provider.codeVerifier,
        redirectUrl,
        // pass optional user create data
        {
            emailVisibility: false,
        }
    );
  }
}
