import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../component/dashboard/dashboard.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {PublicComponent} from "./public.component";


const routes: Routes = [

  { path: 'public', component: PublicComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
