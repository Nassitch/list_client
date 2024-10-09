import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../category/shared/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { Item } from '../../../item/models/item.interface';
import { ShopService } from '../../../shop/shared/services/shop.service';
import { ToastService } from '../../../shared-components/services/toast.service';
import { ImageService } from '../../../shared-components/services/image.service';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrl: './search-category.component.css',
})
export class SearchCategoryComponent implements OnInit, OnDestroy {

  private route: ActivatedRoute = inject(ActivatedRoute);
  private shopService: ShopService = inject(ShopService);
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  protected categoryService: CategoryService = inject(CategoryService);
  public imageService: ImageService = inject(ImageService);

  category$!: Observable<Category>;
  categorySubscription$: Subscription = new Subscription();
  selectedItems: Item[] = [];
  total: number = 0;
  textBtn: string = 'Ajouter au Panier';
  modal: boolean = false;

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.category$ = this.categoryService.getCategory$(id);
  }

  onSelectedItemsChange(items: Item[]): void {
    this.selectedItems = items;
    for (let i: number = 0; i <= this.selectedItems.length; i += 1) {
      this.total = i;
    }
  }

  onSubmit(): void {
    if (this.selectedItems.length > 0) {
        this.categorySubscription$ = this.category$.subscribe((category: Category): void => {
        const existingCategories: Category[] = this.shopService.getShopIntoLS() || [];
        const existingCategory: Category | undefined = existingCategories.find((cat: Category): boolean => cat.id === category.id);

        if (existingCategory) {
          const updatedItems: Item[] = [...existingCategory.items, ...this.selectedItems, ].filter(
            (item: Item, index: number, self: Item[]): boolean => self.findIndex((i: Item): boolean => i.id === item.id) === index);
            const updatedCategory: Category = {...existingCategory, items: updatedItems};
            const updatedCategories: Category[] = existingCategories.map((cat: Category): Category => cat.id === category.id ? updatedCategory : cat);
          this.shopService.saveShop(updatedCategories);
        } else {
          const updatedCategory: Category = {...category, items: this.selectedItems};
          existingCategories.push(updatedCategory);
          this.shopService.saveShop(existingCategories);
        }

        this.toastService.success('Votre Panier à bien été mis à jour.');
        this.router.navigate(['/search']);
      });
    } else {
      this.toastService.error('Vous devez ajouter au moins un article.');
    }
  }

  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
  }
}
