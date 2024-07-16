import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { CategoryManagerComponent } from './components/category-manager/category-manager.component';

const routes: Routes = [
  {path: 'dash-board', component: DashBoardComponent},
  {path: 'category', component: CategoryManagerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
