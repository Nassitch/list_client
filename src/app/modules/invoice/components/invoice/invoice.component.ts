import { Component, inject, OnInit } from '@angular/core';
import { MarketService } from '../../../market/shared/services/market.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Market } from '../../../market/models/market.interface';
import { Shop } from '../../../shop/models/shop.interface';
import { ShopService } from '../../../shop/shared/services/shop.service';
import { ToastService } from '../../../shared-components/services/toast.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})

export class InvoiceComponent implements OnInit {

  protected marketService = inject(MarketService);
  private shopService = inject(ShopService);
  private toastService = inject(ToastService);

  marketList$!: Observable<Market[]>;
  shopList$!: Observable<Shop[]>;
  private refreshShops$ = new BehaviorSubject<void>(undefined);
  total!: number;
  textBtn: string = 'Valider ma Facture';
  marketContent: string = "market";
  activeMarket?: number;
  shopContent: string = "shop";
  activeShop?: number;

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
}
