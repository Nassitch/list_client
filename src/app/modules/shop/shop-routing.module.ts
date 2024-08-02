import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopManagerComponent } from './components/shop-manager/shop-manager.component';
import { BasketComponent } from './components/basket/basket.component';

const routes: Routes = [
  {path: "", component: ShopManagerComponent},
  {path: ":id", component: BasketComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
