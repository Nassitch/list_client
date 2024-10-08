import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../../shared/services/shop.service';
import { BehaviorSubject, map, Observable, Subscription, switchMap } from 'rxjs';
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

  private refreshShops$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  shopList$!: Observable<Shop[]>;

  deleteSubscription$: Subscription = new Subscription();

  private shopService: ShopService = inject(ShopService);
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);
  private storageService: StorageService = inject(StorageService);
  private confirmModalService: ConfirmModalService = inject(ConfirmModalService);

  titleLandingMsg: string = "Gestionnaire de Paniers.";
  descriptionLandingMsg: string = "Cette page contient l'historique de tous vos précédents paniers. Vous pouvez ainsi choisir de créer un nouveau panier ou de modifier un panier existant.";
  addtitonalOneLandingMsg: string = "La première carte vous permet de créer un nouveau panier. S'il y a déjà un panier non validé, il sera supprimé.";
  addtitonalTwoLandingMsg: string = "Dans le cas où vous possédez un panier, la carte 'Panier Actuel' vous permet de modifier, enregistrer ou supprimer ce dernier. Dans le cas contraire, vous avez une liste de vos paniers précédemment validés.";

  currentShop!: Shop | null;
  idToDeleted?: number;
  shopContent: string = "shop";
  activeShop?: number;
  editPath: string = "/shop/";

  ngOnInit(): void {
    this.shopList$ = this.refreshShops$.pipe(
      switchMap(() => this.shopService.getShopFromUser$()),
      map(shopList => shopList.reverse())
    );
    this.currentShop = JSON.parse(this.storageService.getItem(this.shopContent) || 'null');
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
        next: (): void => {
          this.toastService.success("Panier supprimé avec Succès"),
            this.refreshShops$.next()
        },
        error: () => this.toastService.error("Une erreur s'est produite lors de la suppression")
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
