import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { ShopService } from '../../shared/services/shop.service';
import { CategoryService } from '../../../category/shared/services/category.service';
import { Item } from '../../../item/models/item.interface';

@Component({
  selector: 'app-current-shop',
  templateUrl: './current-shop.component.html',
  styleUrl: './current-shop.component.css'
})
export class CurrentShopComponent implements OnInit {

  private shopService = inject(ShopService);
  private cdr = inject(ChangeDetectorRef);
  protected categoryService = inject(CategoryService);

  shopList$!: Observable<Category[]>;

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
    console.log("Clicked !");
  }

}
