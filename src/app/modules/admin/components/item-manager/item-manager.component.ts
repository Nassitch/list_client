import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { CategoryService } from '../../../category/shared/services/category.service';
import { ItemService } from '../../../item/shared/service/item.service';
import { Category } from '../../../category/models/category.interface';
import { ImageService } from '../../../shared-components/services/image.service';
import { Item } from '../../../item/models/item.interface';
import { ToastService } from '../../../shared-components/services/toast.service';

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrl: './item-manager.component.css'
})
export class ItemManagerComponent implements OnInit {
  @ViewChild('inputField') inputField!: ElementRef;
  private refreshItem$ = new BehaviorSubject<void>(undefined);

  private categoryService = inject(CategoryService);
  private itemService = inject(ItemService);
  private toastService = inject(ToastService);
  public imageService = inject(ImageService);

  categoryList$!: Observable<Category[]>;
  itemList$!: Observable<Item[]>;

  postSubscription$: Subscription = new Subscription();
  editSubscription$: Subscription = new Subscription();
  deleteSubscription$: Subscription = new Subscription();

  edit?: boolean;
  categoryContent: string = "category";
  activeCategory?: number;
  activeItem?: number;
  name: string = "";
  textBtn: string = "Enregistrer";

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getAllCategories$();
  }

  newItem(): void {
    this.textBtn = 'Enregistrer';
    this.name = '';
    this.edit = false;
  }
  
  onCardClick(id: number, type: 'category' | 'item', name?: string ): void {
    if (type === 'category') {
      this.itemList$ = this.refreshItem$.pipe(
        switchMap(() => this.itemService.getItemFromCategory$(id))
      );
      this.activeCategory = this.activeCategory === id ? undefined : id;
    }
    if (type === 'item') {
      this.activeItem = this.activeItem === id ? undefined : id;
      this.textBtn = "Modifier";
      name ? this.name = name : "";
      this.edit = true;
    }
  }

  focusInput(): void {
    this.inputField.nativeElement.focus();
  }

  onDelete(id: number): void {
    this.deleteSubscription$ = this.itemService
      .deleteItem$(id)
      .subscribe({
        next: () => {
          this.toastService.success('Produit supprimé avec Succès'),
            this.refreshItem$.next();
        },
        error: (error) =>
          this.toastService.error("Une erreur s'est produite lors de la suppression"),
      });
  }

  onSubmit(): void {
    if (this.name) {
      if (this.edit) {
        if (this.activeCategory !== undefined || this.activeItem !== undefined) {
            this.editSubscription$ = this.itemService
              .editItem$(this.activeItem!, this.name, this.activeCategory!)
              .subscribe({
                next: () => {
                  this.toastService.success('Produit modifiée avec succès.');
                  this.refreshItem$.next();
                },
                error: (error) =>
                  this.toastService.error("Une erreur s'est produite lors de la modification du produit."),
              });
          }
      } else {
        this.postSubscription$ = this.itemService.addItem$(this.activeCategory!, this.name)
          .subscribe({
            next: () => {
              this.toastService.success('Produit ajoutée avec succès.');
              this.refreshItem$.next();
            },
            error: (error) =>
              this.toastService.error("Une erreur s'est produite lors de l'ajout du produit."),
          });
      }
    } else {
      this.toastService.error('Veuillez remplir les champs.');
    }
  }
}
