import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../category/shared/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../../category/models/category.interface';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrl: './search-category.component.css'
})
export class SearchCategoryComponent implements OnInit {

  private route = inject(ActivatedRoute);
  protected categoryService = inject(CategoryService);

  category$!: Observable<Category>;

  textBtn: string = "Ajouter au Panier";

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get("id"));

    this.category$ = this.categoryService.getCategory$(id);
  }
}
