import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { RegisterComponent } from './component/register/register.component';
import { PublicComponent } from './public.component';
import { ActivationComponent } from './component/activation/activation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedUtilsModule} from "../shared-utils/shared-utils.module";


@NgModule({
    declarations: [
        PublicComponent,
        RegisterComponent,
        ActivationComponent,
    ],
    exports: [

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedUtilsModule,
        PublicRoutingModule,
    ]
})
export class PublicModule { }
