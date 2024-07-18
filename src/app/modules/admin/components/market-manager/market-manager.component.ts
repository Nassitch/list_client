import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Market } from '../../../market/models/market.interface';
import { MarketService } from '../../../market/shared/services/market.service';
import { ToastService } from '../../../shared-components/services/toast.service';

@Component({
  selector: 'app-market-manager',
  templateUrl: './market-manager.component.html',
  styleUrl: './market-manager.component.css'
})
export class MarketManagerComponent implements OnInit {

  private refreshMarket$ = new BehaviorSubject<void>(undefined);
  
  private marketService = inject(MarketService);
  private toastService = inject(ToastService);

  marketList$!: Observable<Market[]>;

  deleteSubscription$: Subscription = new Subscription();

  edit: boolean = false;
  activeMarket?: number;
  marketContent: string = "market";
  name: string = '';
  textBtn: string = 'Enregistrer';
  
  ngOnInit(): void {
    this.marketList$ = this.marketService.getAllMarket$();
  }
  
  onCardClick(id: number, name: string, picture: string): void {
    this.activeMarket = this.activeMarket === id ? undefined : id;
    this.name = name;
    this.edit = true;
    this.textBtn = 'Modifier la categorie';
  }

  onDelete(id: number): void {
    this.deleteSubscription$ = this.marketService
      .deleteMarket$(id)
      .subscribe({
        next: () => {
          this.toastService.success('Panier supprimé avec Succès'),
            this.refreshMarket$.next();
        },
        error: (error) =>
          this.toastService.error("Une erreur s'est produite lors de la suppression"),
      });
  }
}
