import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: 'home-page', component: HomePageComponent},
  {path: 'cms/product', loadChildren: () => import('./components/cms/product/product.module').then(m=>m.ProductModule), canActivate: [AuthGuard, AdminGuard]},
  {path: 'shop/product', loadChildren: () => import('./components/shop/product/shop-product.module').then(m=>m.ShopProductModule)},
  {path: 'shop/cart', loadChildren: () => import('./components/shop/cart/cart.module').then(m=>m.CartModule), canActivate: [AuthGuard]},
  {path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: '404', component: NotFoundComponent},
  {path: '500', component: InternalServerComponent},
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
