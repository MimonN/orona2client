import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path: 'home-page', component: HomePageComponent},
  {path: 'cms/product', loadChildren: () => import('./components/cms/product/product.module').then(m=>m.ProductModule)},
  {path: 'shop/product', loadChildren: () => import('./components/shop/product/shop-product.module').then(m=>m.ShopProductModule)},
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
