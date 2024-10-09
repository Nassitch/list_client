import {AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, switchMap } from 'rxjs';
import { CategoryService } from '../../../category/shared/services/category.service';
import { ItemService } from '../../../item/shared/service/item.service';
import { Category } from '../../../category/models/category.interface';
import { ImageService } from '../../../shared-components/services/image.service';
import { Item } from '../../../item/models/item.interface';
import { ToastService } from '../../../shared-components/services/toast.service';
import { ConfirmModalComponent } from '../../../shared-components/components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from '../../../shared-components/services/confirm-modal.service';

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrl: './item-manager.component.css',
})
export class ItemManagerComponent implements OnInit, AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  private refreshItem$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  private categoryService: CategoryService = inject(CategoryService);
  private itemService: ItemService = inject(ItemService);
  private toastService: ToastService = inject(ToastService);
  private confirmModalService: ConfirmModalService = inject(ConfirmModalService);
  public imageService: ImageService = inject(ImageService);

  categoryList$!: Observable<Category[]>;
  itemList$!: Observable<Item[]>;

  postSubscription$: Subscription = new Subscription();
  editSubscription$: Subscription = new Subscription();
  deleteSubscription$: Subscription = new Subscription();

  edit?: boolean;
  idToDeleted?: number;
  categoryContent: string = 'category';
  activeCategory?: number;
  activeItem?: number;
  name: string = '';
  textBtn: string = 'Enregistrer';

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getAllCategories$();
  }

  newItem(): void {
    this.textBtn = 'Enregistrer';
    this.name = '';
    this.edit = false;
  }

  onCardClick(id: number, type: 'category' | 'item', name?: string): void {
    if (type === 'category') {
      this.itemList$ = this.refreshItem$.pipe(
        switchMap(() => this.itemService.getItemFromCategory$(id)),
        map(itemList => itemList.reverse())
      );
      this.activeCategory = this.activeCategory === id ? undefined : id;
    }
    if (type === 'item') {
      this.activeItem = this.activeItem === id ? undefined : id;
      this.textBtn = 'Modifier';
      name ? (this.name = name) : '';
      this.edit = true;
    }
  }

  focusInput(): void {
    this.inputField.nativeElement.focus();
  }

  ngAfterViewInit(): void {
    this.confirmModalService.setModalComponent(this.confirmModal);
  }

  handleConfirmSubmission(response: {confirmed: boolean; action: 'save' | 'delete'; }): void {
    if (response.action === 'save') {
      if (response.confirmed) {
        if (this.name) {
          if (this.edit) {
            if (this.activeCategory !== undefined || this.activeItem !== undefined) {
              this.editSubscription$ = this.itemService.editItem$(this.activeItem!, this.name, this.activeCategory!)
                .subscribe({
                  next: (): void => {
                    this.toastService.success('Produit modifiée avec succès.');
                    this.refreshItem$.next();
                  },
                  error: () => this.toastService.error("Une erreur s'est produite lors de la modification du produit."),
                });
            }
          } else {
            this.postSubscription$ = this.itemService.addItem$(this.activeCategory!, this.name)
              .subscribe({
                next: (): void => {
                  this.toastService.success('Produit ajoutée avec succès.');
                  this.refreshItem$.next();
                },
                error: () => this.toastService.error("Une erreur s'est produite lors de l'ajout du produit."),
              });
          }
        } else {
          this.toastService.error('Veuillez remplir les champs.');
        }
      }
    } else if (response.action === 'delete') {
      if (response.confirmed) {
        this.deleteSubscription$ = this.itemService.deleteItem$(this.idToDeleted!)
          .subscribe({
            next: (): void => {
              this.toastService.success('Produit supprimé avec Succès'),
                this.refreshItem$.next();
            },
            error: () => this.toastService.error("Une erreur s'est produite lors de la suppression"),
          });
      }
    }
  }

  onDelete(id: number): void {
    this.confirmModalService.delete();
    this.idToDeleted = id;
  }

  onSubmit(): void {
    this.confirmModalService.save();
  }
}
