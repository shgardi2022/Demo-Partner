import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/gaurds/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'authentication',
    loadChildren: () => import('./features/identity/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'store',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./features/catalog/store/store.module').then(m => m.StoreModule)
  },
  {
    path: 'storeCategory',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./features/catalog/store-category/store-category.module').then(m => m.StoreCategoryModule)
  },
  {
    path: 'sizeType',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./features/catalog/size-type/size-type.module').then(m => m.SizeTypeModule)
  },
  {
    path: 'size',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./features/catalog/size/size.module').then(m => m.SizeModule)
  },
  {
    path: 'component',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./features/catalog/component/component.module').then(m => m.ComponentModule)
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
