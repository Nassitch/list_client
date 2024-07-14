import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  selectedItems: Item[] = [];
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

  onSelectedItemsChange(items: Item[]): void {
    this.selectedItems = items;
    for (let i = 0; i <= this.selectedItems.length; i += 1) {
      this.total = i;
    }
  }

  onSubmit(): void {
    // if (this.edit) {
    //   this.responseSubscription$ = this.shopService.editShop$();
    // } else {
    //   this.responseSubscription$ = this.shopService.addShop$().subscribe();
    // }
    console.log(this.selectedItems);
  }

  ngOnDestroy(): void {
    this.responseSubscription$.unsubscribe();
  }

}
