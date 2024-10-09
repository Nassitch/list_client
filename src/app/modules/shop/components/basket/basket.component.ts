import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { ShopService } from '../../shared/services/shop.service';
import { Item } from '../../../item/models/item.interface';
import { ActivatedRoute } from '@angular/router';
import { Shop } from '../../models/shop.interface';
import { ImageService } from '../../../shared-components/services/image.service';
import { ConfirmModalService } from '../../../shared-components/services/confirm-modal.service';
import { ConfirmModalComponent } from '../../../shared-components/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  private shopService: ShopService = inject(ShopService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  public imageService: ImageService = inject(ImageService);
  private confirmModalService: ConfirmModalService = inject(ConfirmModalService);

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
    this.total = Object.values(this.selectedItems).reduce((acc: number, items: Item[]) => acc + items.length, 0);
  }

  getAllSelectedItems(): Item[] {
    return Object.values(this.selectedItems).flat();
  }

  ngAfterViewInit(): void {
    this.confirmModalService.setModalComponent(this.confirmModal);
  }

  handleConfirmSubmission(response: { confirmed: boolean, action: 'save' | 'delete' }): void {
    if (response.confirmed) {
    const allSelectedItems: Item[] = this.getAllSelectedItems();
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
  }

  onSubmit(): void {
    this.confirmModalService.save();
  }

  ngOnDestroy(): void {
    this.responseSubscription$.unsubscribe();
  }
}
