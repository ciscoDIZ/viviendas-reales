import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { CreateHousingComponent } from './component/create-housing/create-housing.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MyHousingsComponent } from './component/my-housings/my-housings.component';
import { EditHousingComponent } from './component/edit-housing/edit-housing.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { UserUpdateComponent } from './component/user-update/user-update.component';
import { PasswordChangeComponent } from './component/password-change/password-change.component';
import {SharedUtilsModule} from "../shared-utils/shared-utils.module";
import {MyCommentsComponent} from "./component/my-comments/my-comments.component";


@NgModule({
  declarations: [
    PrivateComponent,
    CreateHousingComponent,
    MyHousingsComponent,
    MyCommentsComponent,
    EditHousingComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    PasswordChangeComponent,
  ],
    imports: [
        CommonModule,
        PrivateRoutingModule,
        ReactiveFormsModule,
        FormsModule,
      SharedUtilsModule
    ],
  exports: [
  ]
})
export class PrivateModule { }
