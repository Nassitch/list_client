import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { CategoryService } from '../../../category/shared/services/category.service';
import { UserService } from '../../../user/shared/services/user.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
  
  protected categoryService = inject(CategoryService);

  categories$!: Observable<Category[]>;
  input!: string;

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories$();
  }
}
