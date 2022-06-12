import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './gaurds/module-import';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShgardiHttpInterceptor } from './interceptors/http.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ShgardiHttpInterceptor,
      multi: true
    }]
})
export class CoreModule {
  /**
   *
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}
