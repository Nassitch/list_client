import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { CategoryManagerComponent } from './components/category-manager/category-manager.component';
import { MarketManagerComponent } from './components/market-manager/market-manager.component';
import { ItemManagerComponent } from './components/item-manager/item-manager.component';

const routes: Routes = [
  {path: 'dash-board', component: DashBoardComponent},
  {path: 'category', component: CategoryManagerComponent},
  {path: 'item', component: ItemManagerComponent},
  {path: 'market', component: MarketManagerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
