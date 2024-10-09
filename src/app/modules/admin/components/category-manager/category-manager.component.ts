import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../category/shared/services/category.service';
import { BehaviorSubject, map, Observable, Subscription, switchMap } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { ToastService } from '../../../shared-components/services/toast.service';
import { ImageService } from '../../../shared-components/services/image.service';
import { ConfirmModalComponent } from '../../../shared-components/components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from '../../../shared-components/services/confirm-modal.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrl: './category-manager.component.css',
})
export class CategoryManagerComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild(ConfirmModalComponent) confirmModal!: ConfirmModalComponent;

  private refreshCategory$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  private toastService: ToastService = inject(ToastService);
  private confirmModalService: ConfirmModalService = inject(ConfirmModalService);
  protected categoryService: CategoryService = inject(CategoryService);
  public imageService: ImageService = inject(ImageService);

  categoryList$!: Observable<Category[]>;

  postSubscription$: Subscription = new Subscription();
  editSubscription$: Subscription = new Subscription();
  deleteSubscription$: Subscription = new Subscription();

  edit: boolean = false;
  activeCategory?: number;
  categoryContent: string = 'category';
  idToDelete?: number;
  name: string = '';
  picture!: File;
  picturePath!: string;
  textBtn: string = 'Enregistrer';

  ngOnInit(): void {
    this.categoryList$ = this.refreshCategory$.pipe(
      switchMap(() => this.categoryService.getAllCategories$()),
      map(categoryList => categoryList.reverse())
    );
  }

  newShop(): void {
    this.textBtn = 'Enregistrer';
    this.edit = false;
    this.name = '';
  }

  onCardClick(id: number, name: string, picture: string): void {
    this.activeCategory = this.activeCategory === id ? undefined : id;
    this.name = name;
    this.picturePath = picture;
    this.edit = true;
    this.textBtn = 'Modifier';
  }

  focusInput(): void {
    this.inputField.nativeElement.focus();
  }

  onFile(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.picture = target.files[0];
    }
  }

  ngAfterViewInit(): void {
    this.confirmModalService.setModalComponent(this.confirmModal);
  }

  handleConfirmSubmission(response: {
    confirmed: boolean;
    action: 'save' | 'delete';
  }): void {
    if (response.action === 'save') {
      if (response.confirmed) {
        if (this.name) {
          const formData: FormData = new FormData();
          formData.append('file', this.picture);

          if (this.edit) {
            if (this.activeCategory !== undefined) {
              if (this.picture) {
                this.editSubscription$ = this.imageService.addImage$(formData, 'category')
                  .pipe(
                    switchMap((picture: any) => this.categoryService.editCategory$(this.name, picture.file, this.activeCategory!)
                    )
                  )
                  .subscribe({
                    next: (): void => {
                      this.toastService.success('Catégorie modifiée avec succès.');
                      this.refreshCategory$.next();
                    },
                    error: () =>
                      this.toastService.error("Une erreur s'est produite lors de la modification de la catégorie."),
                  });
              } else {
                this.editSubscription$ = this.categoryService.editCategory$(this.name, this.picturePath, this.activeCategory!)
                  .subscribe({
                    next: (): void => {
                      this.toastService.success('Catégorie modifiée avec succès.');
                      this.refreshCategory$.next();
                    },
                    error: () => this.toastService.error("Une erreur s'est produite lors de la modification de la catégorie."),
                  });
              }
            }
          } else {
            this.postSubscription$ = this.imageService.addImage$(formData, 'category')
              .pipe(
                switchMap((picture) =>
                  this.categoryService.addCategory$(this.name, picture.file)
                )
              )
              .subscribe({
                next: (): void => {
                  this.toastService.success('Catégorie ajoutée avec succès.');
                  this.refreshCategory$.next();
                },
                error: () => this.toastService.error("Une erreur s'est produite lors de l'ajout de la catégorie."),
              });
          }
        } else {
          this.toastService.error('Veuillez remplir les champs.');
        }
      }
    } else if (response.action === 'delete') {
      if (response.confirmed) {
        this.deleteSubscription$ = this.categoryService
          .deleteCategory$(this.idToDelete!)
          .subscribe({
            next: (): void => {
              this.toastService.success('Panier supprimé avec Succès'),
                this.refreshCategory$.next();
            },
            error: () => this.toastService.error("Une erreur s'est produite lors de la suppression"),
          });
      }
    }
  }

  onDelete(id: number): void {
    this.confirmModalService.delete();
    this.idToDelete = id;
  }

  onSubmit(): void {
    this.confirmModalService.save();
  }

  ngOnDestroy(): void {
    this.postSubscription$.unsubscribe();
    this.editSubscription$.unsubscribe();
    this.deleteSubscription$.unsubscribe();
  }
}
