import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopManagerComponent } from './components/shop-manager/shop-manager.component';

const routes: Routes = [
  {path: "", component: ShopManagerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
