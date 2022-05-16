import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HousingComponent} from "./component/housing/housing.component";
import {HousingDetailsComponent} from "./component/housing-details/housing-details.component";
import {ImageComponent} from "./component/image/image.component";
import {ImageDetailsComponent} from "./component/image-details/image-details.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {CommentComponent} from "./component/comment/comment.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'housing', component: HousingComponent },
  { path: 'housing/details/:id', component: HousingDetailsComponent },
  { path: 'image/:housing', component: ImageComponent },
  { path: 'image/details/:id', component: ImageDetailsComponent },
  { path: 'comment/:instance/:id', component: CommentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
