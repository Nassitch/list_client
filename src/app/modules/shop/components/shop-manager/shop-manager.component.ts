import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../../shared/services/shop.service';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { Shop } from '../../models/shop.interface';
import { ToastService } from '../../../shared-components/services/toast.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../../core/services/storage.service';
import { ConfirmModalComponent } from '../../../shared-components/components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from '../../../shared-components/services/confirm-modal.service';

@Component({
  selector: 'app-shop-manager',
  templateUrl: './shop-manager.component.html',
  styleUrl: './shop-manager.component.css'
})
export class ShopManagerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  private refreshShops$ = new BehaviorSubject<void>(undefined);
  
  shopList$!: Observable<Shop[]>;

  deleteSubscription$: Subscription = new Subscription();

  private shopService = inject(ShopService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private storageService = inject(StorageService);
  private confirmModalService = inject(ConfirmModalService);

  titleLandingMsg: string = "Gestionnaire de Paniers.";
  descriptionLandingMsg: string = "Cette page contient l'histoique de tous vos precédents paniers, vous pouvez ainsi choisir de créer un nouveau panier ou bien modifier un panier existant.";
  addtitonalOneLandingMsg: string = "La première carte vous permet créer un nouveau Panier. S'il y a déjà un panier non validé il sera supprimé.";
  addtitonalTwoLandingMsg: string = "La deuxième carte vous permet de consulter votre panier actuel afin de le modifier ou le valider.";

  currentShop!: any;
  idToDeleted?: number;
  shopContent: string = "shop";
  activeShop?: number;
  editPath: string = "/shop/";

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

  ngAfterViewInit(): void {
    this.confirmModalService.setModalComponent(this.confirmModal);
  }

  handleConfirmSubmission(response: { confirmed: boolean, action: 'save' | 'delete' }): void {
  if (response.confirmed) {
    this.deleteSubscription$ = this.shopService.deleteShop$(this.idToDeleted!).subscribe({
      next: () => {
        this.toastService.success("Panier supprimé avec Succès"),
        this.refreshShops$.next()
      },
      error: (error) => this.toastService.error("Une erreur s'est produite lors de la suppression")
    });
  }
}

  onDelete(id: number): void {
    this.confirmModalService.delete();
    this.idToDeleted = id;
  }

  ngOnDestroy(): void {
    this.deleteSubscription$.unsubscribe();
  }
}