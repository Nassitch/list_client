import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { ShopService } from '../../shared/services/shop.service';
import { CategoryService } from '../../../category/shared/services/category.service';
import { Item } from '../../../item/models/item.interface';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../../models/shop.interface';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit, OnDestroy {

  private shopService = inject(ShopService);
  private cdr = inject(ChangeDetectorRef);
  protected categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);

  shopList$!: Observable<Category[]>;
  shop$!: Observable<Shop>;
  responseSubscription$: Subscription = new Subscription();

  edit: boolean = false;
  selectedItems: { [categoryId: number]: Item[] } = {};
  total: number = 0;
  textBtn: string = "Valider mon Panier";
  
  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    
    if (id === 0) {
      this.shopList$ = this.shopService.getShop$();
    } else {
      this.shop$ = this.shopService.getShopById$(id);
      this.edit = true;
      this.textBtn= "Modifier mon Panier";
    }

  }

  onSelectedItemsChange(categoryId: number, items: Item[]): void {
    this.selectedItems[categoryId] = items;
    this.total = Object.values(this.selectedItems).reduce((acc, items) => acc + items.length, 0);
  }

  getAllSelectedItems(): Item[] {
    return Object.values(this.selectedItems).flat();
  }

  onSubmit(): void {
    const allSelectedItems = this.getAllSelectedItems();
    if (this.edit) {

      this.responseSubscription$ = this.shop$
        .pipe(
          switchMap(shop => this.shopService.editShop$(allSelectedItems, shop.id))
        )
        .subscribe();
    } else {
      this.responseSubscription$ = this.shopService.addShop$(allSelectedItems).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.responseSubscription$.unsubscribe();
  }

}
