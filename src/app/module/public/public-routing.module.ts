import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../component/dashboard/dashboard.component";
import {RegisterComponent} from "./component/register/register.component";
import {PublicComponent} from "./public.component";
import {Error404Component} from "../../component/error404/error404.component";


const routes: Routes = [

  { path: 'public', component: PublicComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', component: Error404Component }
    ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
