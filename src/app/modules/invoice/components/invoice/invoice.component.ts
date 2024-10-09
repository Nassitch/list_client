import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MarketService } from '../../../market/shared/services/market.service';
import { BehaviorSubject, map, Observable, Subscription, switchMap } from 'rxjs';
import { Market } from '../../../market/models/market.interface';
import { Shop } from '../../../shop/models/shop.interface';
import { ShopService } from '../../../shop/shared/services/shop.service';
import { ToastService } from '../../../shared-components/services/toast.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { ImageService } from '../../../shared-components/services/image.service';
import { ConfirmModalComponent } from '../../../shared-components/components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from '../../../shared-components/services/confirm-modal.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})

export class InvoiceComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  private refreshShops$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  private invoiceService: InvoiceService = inject(InvoiceService);
  private shopService: ShopService = inject(ShopService);
  private toastService: ToastService = inject(ToastService);
  private confirmModalService: ConfirmModalService = inject(ConfirmModalService);
  protected marketService: MarketService = inject(MarketService);
  public imageService: ImageService = inject(ImageService);

  marketList$!: Observable<Market[]>;
  shopList$!: Observable<Shop[]>;

  postSubscription$: Subscription = new Subscription();
  deleteSubscription$: Subscription = new Subscription();

  marketContent: string = "market";
  activeMarket?: number;
  idToDeleted?: number;
  shopContent: string = "shop";
  activeShop?: number;
  editPath: string = "/shop/";
  total!: number;
  textBtn: string = 'Valider ma Facture';

  ngOnInit(): void {
    this.marketList$ = this.marketService.getAllMarket$();
    this.shopList$ = this.refreshShops$.pipe(
      switchMap(() => this.shopService.getShopFromUser$()),
      map(shopList => shopList.reverse())
    );
  }

  ngAfterViewInit(): void {
    this.confirmModalService.setModalComponent(this.confirmModal);
  }

  onCardClick(id: number, type: 'market' | 'shop'): void {
    if (type === 'market') {
      this.activeMarket = (this.activeMarket === id) ? undefined : id;
    } else if (type === 'shop') {
      this.activeShop = (this.activeShop === id) ? undefined : id;
    }
  }

  onDelete(id: number): void {
    this.confirmModalService.delete();
    this.idToDeleted = id;
  }

  handleConfirmSubmission(response: { confirmed: boolean, action: 'save' | 'delete' }): void {
    if (response.action === 'save') {
      if (this.total === undefined || this.activeMarket === undefined || this.activeShop === undefined) {
        this.toastService.error('Tous les champs ne sont pas remplis.');
    } else {
      if (response.confirmed) {
        this.postSubscription$ = this.invoiceService.addInvoice$(this.total, this.activeMarket, this.activeShop).subscribe({
          next: (): void => {
            this.toastService.success('Facture validée avec succès.');
            this.refreshShops$.next()
          },
          error: (): void => {
            this.toastService.error('La facture est déjà existante.');
          }
        });
      }
    }
  } else if (response.action === 'delete') {
    this.deleteSubscription$ = this.shopService.deleteShop$(this.idToDeleted!).subscribe({
      next: (): void => {
        this.toastService.success("Panier supprimé avec Succès"),
        this.refreshShops$.next()
      },
      error: () => this.toastService.error("Une erreur s'est produite lors de la suppression")
    });
  }
}

  onSubmit(): void {
    this.confirmModalService.save();
  }

  ngOnDestroy(): void {
    this.postSubscription$.unsubscribe();
    this.deleteSubscription$.unsubscribe();
  }
}
