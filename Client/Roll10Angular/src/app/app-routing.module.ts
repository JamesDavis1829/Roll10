import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';
import {CharacterListComponent} from "./character-list/character-list.component";
import {CharacterCreationComponent} from "./character-creation/character-creation.component";

const routes: Routes = [
  { path: "redirect", component: RedirectComponent },
  { path: "login", component: LoginComponent },
  { path: "create", component: CharacterCreationComponent },
  { path: "**", component: CharacterListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
