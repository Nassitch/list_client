import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopManagerComponent } from './components/shop-manager/shop-manager.component';
import { CurrentShopComponent } from './components/current-shop/current-shop.component';

const routes: Routes = [
  {path: "", component: ShopManagerComponent},
  {path: "current", component: CurrentShopComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
