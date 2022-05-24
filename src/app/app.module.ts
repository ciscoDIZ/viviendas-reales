import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./component/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {PublicModule} from "./module/public/public.module";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {HousingDetailsComponent} from "./component/housing-details/housing-details.component";
import {PrivateModule} from "./module/private/private.module";
import {FooterComponent} from './component/footer/footer.component';
import {HousingComponent} from './component/housing/housing.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ImageComponent} from './component/image/image.component';
import {ImageDetailsComponent} from './component/image-details/image-details.component';
import {SharedUtilsModule} from "./module/shared-utils/shared-utils.module";
import { CommentComponent } from './component/comment/comment.component';
import { CommentDetailsComponent } from './component/comment-details/comment-details.component';
import {FormsModule} from "@angular/forms";
import { ProfileComponent } from './component/profile/profile.component';
import { Error404Component } from './component/error404/error404.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { HousingByOwnerComponent } from './component/housing-by-owner/housing-by-owner.component';
import { UploadHousingImageComponent } from './component/upload-housing-image/upload-housing-image.component';
import {AngularFireModule} from "@angular/fire/compat";
import { environment } from "../environments/environment.prod";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    HousingDetailsComponent,
    FooterComponent,
    HousingComponent,
    ImageComponent,
    ImageDetailsComponent,
    CommentComponent,
    CommentDetailsComponent,
    ProfileComponent,
    Error404Component,
    HousingByOwnerComponent,
    UploadHousingImageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    PublicModule,
    PrivateModule,
    SharedUtilsModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    JwtHelperService
  ],
  exports: [
    HeaderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
