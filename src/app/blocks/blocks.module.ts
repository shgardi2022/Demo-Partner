import { NgModule } from '@angular/core';
import { BlocksRoutingModule } from './blocks-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from './root/app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, MenuComponent],
  imports: [
    BlocksRoutingModule,
    SharedModule
  ],
  exports: [AppComponent]
})
export class BlocksModule { }
