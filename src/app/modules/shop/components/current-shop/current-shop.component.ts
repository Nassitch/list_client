import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { ShopService } from '../../shared/services/shop.service';
import { CategoryService } from '../../../category/shared/services/category.service';
import { Item } from '../../../item/models/item.interface';

@Component({
  selector: 'app-current-shop',
  templateUrl: './current-shop.component.html',
  styleUrl: './current-shop.component.css'
})
export class CurrentShopComponent implements OnInit, OnDestroy {

  private shopService = inject(ShopService);
  private cdr = inject(ChangeDetectorRef);
  protected categoryService = inject(CategoryService);

  shopList$!: Observable<Category[]>;
  responseSubscription$: Subscription = new Subscription();

  selectedItems: Item[] = [];
  total: number = 0;
  textBtn: string = "Valider mon Panier";

  ngOnInit(): void {
    this.shopList$ = this.shopService.getShop$();
  }

  onSelectedItemsChange(items: Item[]): void {
    this.selectedItems = [...this.selectedItems, ...items];
    this.selectedItems = this.selectedItems.filter((item, index, self) =>
      index === self.findIndex((i) => i.id === item.id)
    );
    this.cdr.detectChanges();
  }

  onSubmit(): void {
    this.responseSubscription$ = this.shopService.addShop$().subscribe();
  }

  ngOnDestroy(): void {
    this.responseSubscription$.unsubscribe();
  }

}
