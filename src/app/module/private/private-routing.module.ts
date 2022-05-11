import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../component/dashboard/dashboard.component";
import {HousingDetailsComponent} from "../../component/housing-details/housing-details.component";
import {PrivateComponent} from "./private.component";

const routes: Routes = [
  { path: 'private', component: PrivateComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'housing/details/:id', component: HousingDetailsComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
