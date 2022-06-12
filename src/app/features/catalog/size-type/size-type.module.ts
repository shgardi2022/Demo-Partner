import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SizeTypeRoutingModule } from './size-type-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    SizeTypeRoutingModule
  ]
})
export class SizeTypeModule { }
