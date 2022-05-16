import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReadMorePipe} from "./pipe/read-more.pipe";



@NgModule({
  declarations: [
    ReadMorePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReadMorePipe
  ]
})
export class SharedUtilsModule { }
