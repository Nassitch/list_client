import { Component, inject, OnInit } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { CategoryService } from '../../../category/shared/services/category.service';
import { Router } from '@angular/router';
import { ImageService } from '../../../shared-components/services/image.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit {
  private router = inject(Router);
  protected categoryService = inject(CategoryService);
  public imageService = inject(ImageService);

  categories$!: Observable<Category[]>;
  input: string = '';
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categories$ = this.categoryService.getAllCategories$();
  }

  reset(): void {
    this.input = '';
  }

  navigateTo(type: string, path: number | string): void {
    this.router.navigate([type + path]);
  }
}
