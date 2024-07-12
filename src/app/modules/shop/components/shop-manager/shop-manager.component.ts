import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../shared/services/shop.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Shop } from '../../models/shop.interface';
import { ToastService } from '../../../shared-components/services/toast.service';

@Component({
  selector: 'app-shop-manager',
  templateUrl: './shop-manager.component.html',
  styleUrl: './shop-manager.component.css'
})
export class ShopManagerComponent implements OnInit {

  private refreshShops$ = new BehaviorSubject<void>(undefined);
  
  shopList$!: Observable<Shop[]>;

  private shopService = inject(ShopService);
  private toastService = inject(ToastService);

  titleLandingMsg: string = "Gestionnaire de Paniers.";
  descriptionLandingMsg: string = "Cette page contient l'histoique de tous vos precédents paniers, vous pouvez ainsi choisir de créer un nouveau panier ou bien modifier un panier existant.";

  shopContent: string = "shop";
  activeShop?: number;

  ngOnInit(): void {
    this.shopList$ = this.refreshShops$.pipe(
      switchMap(() => this.shopService.getShopFromUser$())
    );
  }

  onCardClick(id: number): void {
    this.activeShop = (this.activeShop === id) ? undefined : id;
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