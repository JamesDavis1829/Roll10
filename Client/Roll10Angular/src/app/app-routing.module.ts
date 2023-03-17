import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';
import {CharacterListComponent} from "./character-list/character-list.component";
import {CharacterCreationComponent} from "./character-creation/character-creation.component";
import {SettingsMenuComponent} from "./settings-menu/settings-menu.component";
import {AncestryListComponent} from "./ancestry-list/ancestry-list.component";
import {ItemListComponent} from "./item-list/item-list.component";
import {ActionListComponent} from "./action-list/action-list.component";
import {SpellListComponent} from "./spell-list/spell-list.component";

const routes: Routes = [
  { path: "redirect", component: RedirectComponent },
  { path: "login", component: LoginComponent },
  { path: "create", component: CharacterCreationComponent },
  { path: "characters", component: CharacterListComponent },
  { path: "settings", component: SettingsMenuComponent },
  { path: "ancestries", component: AncestryListComponent },
  { path: "items", component: ItemListComponent },
  { path: "actions", component: ActionListComponent },
  { path: "spells", component: SpellListComponent },
  { path: "**", redirectTo : "characters" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
