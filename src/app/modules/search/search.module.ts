import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { FormsModule } from '@angular/forms';
import { SearchCategoryComponent } from './components/search-category/search-category.component';
import { SubmitBtnComponent } from '../shared-components/components/submit-btn/submit-btn.component';
import { ListComponent } from '../shared-components/components/list/list.component';
import { TotalComponent } from '../shared-components/components/total/total.component';


@NgModule({
  declarations: [
    SearchPageComponent,
    SearchCategoryComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    ListComponent,
    SubmitBtnComponent,
    TotalComponent
  ]
})
export class SearchModule { }
