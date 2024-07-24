import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../category/shared/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { Item } from '../../../item/models/item.interface';
import { ShopService } from '../../../shop/shared/services/shop.service';
import { ToastService } from '../../../shared-components/services/toast.service';
import { ImageService } from '../../../shared-components/services/image.service';
import { ConfirmModalComponent } from '../../../shared-components/components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from '../../../shared-components/services/confirm-modal.service';

@Component({
  selector: 'app-search-category',
  templateUrl: './search-category.component.html',
  styleUrl: './search-category.component.css',
})
export class SearchCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  private route = inject(ActivatedRoute);
  private shopService = inject(ShopService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private confirmModalService = inject(ConfirmModalService);
  protected categoryService = inject(CategoryService);
  public imageService = inject(ImageService);
  
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
    for (let i = 0; i <= this.selectedItems.length; i += 1) {
      this.total = i;
    }
  }

  ngAfterViewInit(): void {
    this.confirmModalService.setModalComponent(this.confirmModal);
  }

  onSubmit(): void {
    if (this.selectedItems.length > 0) {
      this.confirmModalService.save();
    } else {
      this.toastService.error('Vous devez ajouter au moins un article.');
    }
  }

  onConfirmSubmission(response: boolean): void {
    if (response) {
      this.categorySubscription$ = this.category$.subscribe((category) => {
        const existingCategories: Category[] = this.shopService.getShopIntoLS() || [];
        const existingCategory = existingCategories.find((cat) => cat.id === category.id);

        if (existingCategory) {
          const updatedItems = [...existingCategory.items, ...this.selectedItems, ].filter(
            (item, index, self) => self.findIndex((i) => i.id === item.id) === index);
          const updatedCategory: Category = {...existingCategory, items: updatedItems};
          const updatedCategories = existingCategories.map((cat) => cat.id === category.id ? updatedCategory : cat);
          this.shopService.saveShop(updatedCategories);
        } else {
          const updatedCategory: Category = {...category, items: this.selectedItems};
          existingCategories.push(updatedCategory);
          this.shopService.saveShop(existingCategories);
        }

        this.toastService.success('Votre Panier à bien été mis à jour.');
        this.router.navigate(['/search']);
      });
    }
  }

  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
  }
}
