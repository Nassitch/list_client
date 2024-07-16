import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MarketService } from '../../../market/shared/services/market.service';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { Market } from '../../../market/models/market.interface';
import { Shop } from '../../../shop/models/shop.interface';
import { ShopService } from '../../../shop/shared/services/shop.service';
import { ToastService } from '../../../shared-components/services/toast.service';
import { InvoiceService } from '../../shared/services/invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})

export class InvoiceComponent implements OnInit, OnDestroy {

  private refreshShops$ = new BehaviorSubject<void>(undefined);

  private invoiceService = inject(InvoiceService);
  protected marketService = inject(MarketService);
  private shopService = inject(ShopService);
  private toastService = inject(ToastService);

  marketList$!: Observable<Market[]>;
  shopList$!: Observable<Shop[]>;

  postSubscription$: Subscription = new Subscription();
  deleteSubscription$: Subscription = new Subscription();

  marketContent: string = "market";
  activeMarket?: number;
  shopContent: string = "shop";
  activeShop?: number;
  editPath: string = "/shop/";
  total!: number;
  textBtn: string = 'Valider ma Facture';

  ngOnInit(): void {
    this.marketList$ = this.marketService.getAllMarket$();
    this.shopList$ = this.refreshShops$.pipe(
      switchMap(() => this.shopService.getShopFromUser$())
    );
  }

  onCardClick(id: number, type: 'market' | 'shop'): void {
    if (type === 'market') {
      this.activeMarket = (this.activeMarket === id) ? undefined : id;
    } else if (type === 'shop') {
      this.activeShop = (this.activeShop === id) ? undefined : id;
    }
  }

  onDelete(id: number): void {
    this.deleteSubscription$ = this.shopService.deleteShop$(id).subscribe({
      next: () => {
        this.toastService.success("Panier supprimé avec Succès"),
        this.refreshShops$.next()
      },
      error: (error) => this.toastService.error("Une erreur s'est produite lors de la suppression")
    });
  }

  onSubmit(): void {
    if (this.total === undefined || this.activeMarket === undefined || this.activeShop === undefined) {
      this.toastService.error('Tous les champs ne sont pas remplis.');
    } else {
     this.postSubscription$ = this.invoiceService.addInvoice$(this.total, this.activeMarket, this.activeShop).subscribe({
        next: (response) => {
          this.toastService.success('Facture validée avec succès.');
        },
        error: (error) => {
          this.toastService.error('La facture est déjà existante.');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.postSubscription$.unsubscribe();
    this.deleteSubscription$.unsubscribe();
  }
}
