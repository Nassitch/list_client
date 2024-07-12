import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchCategoryComponent } from './components/search-category/search-category.component';

const routes: Routes = [
  {path: '', component: SearchPageComponent},
  {path: 'category/:id', component: SearchCategoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
