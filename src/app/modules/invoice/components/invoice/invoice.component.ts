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

  postSubscribtion$: Subscription = new Subscription;

  marketContent: string = "market";
  activeMarket?: number;
  shopContent: string = "shop";
  activeShop?: number;
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
    console.log("The state of market is :", this.activeMarket);
    console.log("The state of shop is :", this.activeShop);
  }

  onDelete(id: number): void {
    this.shopService.deleteShop$(id).subscribe({
      next: () => {
        this.toastService.show("Panier supprimé avec Succès", 'Succès', 'success'),
        this.refreshShops$.next()
      },
      error: (error) => this.toastService.show("Une erreur s'est produite lors de la suppression", 'Erreur', 'error')
    });
  }

  onSubmit(): void {
    if (this.total === undefined || this.activeMarket === undefined || this.activeShop === undefined) {
      console.log("total: " + this.total + ", market_id: " + this.activeMarket + ", shop_id: " + this.activeShop);
      this.toastService.show('Tous les champs ne sont pas remplis.', 'Erreur', 'error');
    } else {
      console.log("total: " + this.total + " market_id: " + this.activeMarket + " shop_id: " + this.activeShop);
     this.postSubscribtion$ = this.invoiceService.postInvoice$(this.total, this.activeMarket, this.activeShop).subscribe({
        next: (response) => {
          this.toastService.show('Facture validée avec succès.', 'Succès', 'success');
        },
        error: (error) => {
          this.toastService.show('La facture est déjà existante.', 'Erreur', 'error');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.postSubscribtion$.unsubscribe();
  }
}
