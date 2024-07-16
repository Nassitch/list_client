import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../shared/services/shop.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Shop } from '../../models/shop.interface';
import { ToastService } from '../../../shared-components/services/toast.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../../core/services/storage.service';

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
  private router = inject(Router);
  private storageService = inject(StorageService);

  titleLandingMsg: string = "Gestionnaire de Paniers.";
  descriptionLandingMsg: string = "Cette page contient l'histoique de tous vos precédents paniers, vous pouvez ainsi choisir de créer un nouveau panier ou bien modifier un panier existant.";
  addtitonalOneLandingMsg: string = "La première carte vous permet créer un nouveau Panier. S'il y a déjà un panier non validé il sera supprimé.";
  addtitonalTwoLandingMsg: string = "La deuxième carte vous permet de consulter votre panier actuel afin de le modifier ou le valider.";

  currentShop!: any;
  shopContent: string = "shop";
  activeShop?: number;

  ngOnInit(): void {
    this.shopList$ = this.refreshShops$.pipe(
      switchMap(() => this.shopService.getShopFromUser$())
    );
    this.currentShop = this.storageService.getItem(this.shopContent);
  }

  newShop(): void {
    this.toastService.success('Vous avez ouvert un nouveau panier.');
    if (this.currentShop) {
      this.storageService.removeItem(this.shopContent);
    }
  }

  onCardClick(id: number): void {
    this.activeShop = (this.activeShop === id) ? undefined : id;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  onDelete(id: number): void {
    this.shopService.deleteShop$(id).subscribe({
      next: () => {
        this.toastService.success("Panier supprimé avec Succès"),
        this.refreshShops$.next()
      },
      error: (error) => this.toastService.error("Une erreur s'est produite lors de la suppression")
    });
  }
}