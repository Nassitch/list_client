import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { Market } from '../../../market/models/market.interface';
import { MarketService } from '../../../market/shared/services/market.service';
import { ToastService } from '../../../shared-components/services/toast.service';
import { ImageService } from '../../../shared-components/services/image.service';

@Component({
  selector: 'app-market-manager',
  templateUrl: './market-manager.component.html',
  styleUrl: './market-manager.component.css',
})
export class MarketManagerComponent implements OnInit {
  private refreshMarket$ = new BehaviorSubject<void>(undefined);

  private marketService = inject(MarketService);
  private toastService = inject(ToastService);
  public imageService = inject(ImageService);

  marketList$!: Observable<Market[]>;

  editSubscription$: Subscription = new Subscription();
  postSubscription$: Subscription = new Subscription();
  deleteSubscription$: Subscription = new Subscription();

  edit: boolean = false;
  activeMarket?: number;
  marketContent: string = 'market';
  name: string = '';
  size: string = '';
  place: string = '';
  picture!: File;
  picturePath?: string;
  textBtn: string = 'Enregistrer';
  
  ngOnInit(): void {
    this.marketList$ = this.refreshMarket$.pipe(
      switchMap(() => this.marketService.getAllMarket$())
    );
  }
  
  newMarket(): void {
    this.edit = false;
    this.textBtn = 'Enregistrer';
    this.name = '';
    this.size = '';
    this.place = '';
  }

  onCardClick(id: number, name: string, size: string, place: string, picturePath: string): void {
    this.activeMarket = this.activeMarket === id ? undefined : id;
    this.edit = true;
    this.name = name;
    this.size = size;
    this.place = place;
    this.picturePath = picturePath;
    this.textBtn = 'Modifier';
  }

  focusInput(inputField: HTMLInputElement): void {
    inputField.focus();
  }

  onFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.picture = target.files[0];
    }
  }

  onDelete(id: number): void {
    this.deleteSubscription$ = this.marketService.deleteMarket$(id).subscribe({
      next: () => {
        this.toastService.success('Marché supprimé avec Succès'),
          this.refreshMarket$.next();
      },
      error: (error) =>
        this.toastService.error(
          "Une erreur s'est produite lors de la suppression"
        ),
    });
  }

  onSubmit(): void {
    if (this.name || this.size || this.place) {
      const formData = new FormData();
      formData.append('file', this.picture);

      if (this.edit) {
        if (this.activeMarket !== undefined) {
          if (this.picture) {
            this.editSubscription$ = this.imageService
              .addImage$(formData, 'market')
              .pipe(
                switchMap((picture) =>
                  this.marketService.editMarket$(this.name, this.size, this.place, picture.file, this.activeMarket!)
                )
              )
              .subscribe({
                next: () => {
                  this.toastService.success('Marché modifiée avec succès.');
                  this.refreshMarket$.next();
                },
                error: (error) =>
                  this.toastService.error("Une erreur s'est produite lors de la modification du Marché."),
              });
          } else {
            this.editSubscription$ = this.marketService
              .editMarket$(this.name, this.size, this.place, this.picturePath!, this.activeMarket!)
              .subscribe({
                next: () => {
                  this.toastService.success('Marché modifiée avec succès.');
                  this.refreshMarket$.next();
                },
                error: (error) =>
                  this.toastService.error("Une erreur s'est produite lors de la modification du Marché."),
              });
          }
        }
      } else {
        this.postSubscription$ = this.imageService
          .addImage$(formData, 'market')
          .pipe(
            switchMap((picture) =>
              this.marketService.addMarket$(this.name, this.size, this.place, picture.file)
            )
          )
          .subscribe({
            next: () => {
              this.toastService.success('Marché ajoutée avec succès.');
              this.refreshMarket$.next();
            },
            error: (error) =>
              this.toastService.error("Une erreur s'est produite lors de l'ajout du Marché."),
          });
      }
    } else {
      this.toastService.error('Veuillez remplir les champs.');
    }
  }

  trackByMarketId(index: number, market: Market): number {
    return market.id;
  }
}
