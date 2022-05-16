import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrivateComponent} from "./private.component";
import {CreateHousingComponent} from "./component/create-housing/create-housing.component";
import {MyHousingsComponent} from "./component/my-housings/my-housings.component";
import {EditHousingComponent} from "./component/edit-housing/edit-housing.component";
import {UserDetailsComponent} from "./component/user-details/user-details.component";
import {PasswordChangeComponent} from "./component/password-change/password-change.component";
import {MyCommentsComponent} from "./component/my-comments/my-comments.component";


const routes: Routes = [
  { path: 'private', component: PrivateComponent,
    children: [
      { path: 'housing/create', component: CreateHousingComponent },
      { path: 'housing/me', component: MyHousingsComponent },
      { path: 'housing/edit/:id', component: EditHousingComponent },
      { path: 'user/details', component: UserDetailsComponent },
      { path: 'user/password/change', component: PasswordChangeComponent },
      { path: 'comment/me', component: MyCommentsComponent }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
