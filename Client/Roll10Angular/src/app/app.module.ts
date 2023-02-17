import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';
import { LoginComponent } from './login/login.component';
import { ToastComponent } from './toast/toast.component';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PopupMenuComponent } from './popup-menu/popup-menu.component';
import { LoadingComponent } from './loading/loading.component';
import { DiceLogComponent } from './dice-log/dice-log.component';
import { CharacterDescriptionComponent } from './character-description/character-description.component';
import { RollableEntryComponent } from './rollable-entry/rollable-entry.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterCreationComponent } from './character-creation/character-creation.component';
import { RoundIncAndDecComponent } from './round-inc-and-dec/round-inc-and-dec.component';

@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent,
    LoginComponent,
    ToastComponent,
    SettingsMenuComponent,
    PopupMenuComponent,
    LoadingComponent,
    DiceLogComponent,
    CharacterDescriptionComponent,
    RollableEntryComponent,
    CharacterListComponent,
    CharacterCreationComponent,
    RoundIncAndDecComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
