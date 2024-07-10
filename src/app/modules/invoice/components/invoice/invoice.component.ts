import { Component, inject, OnInit } from '@angular/core';
import { MarketService } from '../../../market/shared/services/market.service';
import { Observable } from 'rxjs';
import { Market } from '../../../market/models/market.interface';
import { Shop } from '../../../shop/models/shop.interface';
import { ShopService } from '../../../shop/shared/services/shop.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

  protected marketService = inject(MarketService);
  private shopService = inject(ShopService);

  marketList$!: Observable<Market[]>;
  shopList$!: Observable<Shop[]>;

  imgContent: string = '../../../../../assets/icons/bin.svg';
  count: number = 5;
  name: string = 'Carrefour';
  subName: string = 'Super marché';

  ngOnInit(): void {
    this.marketList$ = this.marketService.getAllMarket$();
    this.shopList$ = this.shopService.getShopFromUser$();
  }
}
