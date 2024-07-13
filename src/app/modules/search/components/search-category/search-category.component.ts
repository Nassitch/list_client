import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../category/shared/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { Item } from '../../../item/models/item.interface';
import { ShopService } from '../../../shop/shared/services/shop.service';
import { ToastService } from '../../../shared-components/services/toast.service';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrl: './search-category.component.css'
})
export class SearchCategoryComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  protected categoryService = inject(CategoryService);
  private shopService = inject(ShopService);
  private toastService = inject(ToastService);
  
  category$!: Observable<Category>;
  categorySubsription$: Subscription = new Subscription();
  selectedItems: Item[] = [];
  total: number = 0;
  textBtn: string = "Ajouter au Panier";

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get("id"));
    this.category$ = this.categoryService.getCategory$(id);
  }

  onSelectedItemsChange(items: Item[]): void {
    this.selectedItems = items;
  }

  onSubmit(): void {
    if (this.selectedItems.length > 0) {
      this.categorySubsription$ = this.category$.subscribe(category => {
        const updatedCategory: Category = {...category, items: this.selectedItems};
        this.shopService.saveItems(updatedCategory);
        this.toastService.show('Votre Panier à bien été mis à jour.', 'Succès', 'success');
        console.log('Éléments soumis:', updatedCategory);
      });
    } else {
      this.toastService.show('Vous devez ajouter au moins un article.', 'Erreur', 'error');
    }
  }

  ngOnDestroy(): void {
    this.categorySubsription$.unsubscribe();
  }
}
