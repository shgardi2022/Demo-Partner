import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreCategoryRoutingModule } from './store-category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    StoreCategoryRoutingModule
  ]
})
export class StoreCategoryModule { }
