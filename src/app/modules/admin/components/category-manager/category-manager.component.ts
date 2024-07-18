import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CategoryService } from '../../../category/shared/services/category.service';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { ToastService } from '../../../shared-components/services/toast.service';
import { ImageService } from '../../../shared-components/services/image.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrl: './category-manager.component.css',
})
export class CategoryManagerComponent implements OnInit, OnDestroy {
  @ViewChild('inputField') inputField!: ElementRef;

  private refreshCategory$ = new BehaviorSubject<void>(undefined);

  private toastService = inject(ToastService);
  public imageService = inject(ImageService);
  protected categoryService = inject(CategoryService);

  categoryList$!: Observable<Category[]>;

  postSubscription$: Subscription = new Subscription();
  editSubscription$: Subscription = new Subscription();
  deleteSubscription$: Subscription = new Subscription();

  edit: boolean = false;
  activeCategory?: number;
  categoryContent: string = 'category';
  name: string = '';
  picture!: File;
  picturePath!: string;
  textBtn: string = 'Enregistrer';

  ngOnInit(): void {
    this.categoryList$ = this.refreshCategory$.pipe(
      switchMap(() => this.categoryService.getAllCategories$())
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
    this.textBtn = 'Modifier la categorie';
  }

  focusInput(): void {
    this.inputField.nativeElement.focus();
  }

  onFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.picture = target.files[0];
    }
  }

  onDelete(id: number): void {
    this.deleteSubscription$ = this.categoryService
      .deleteCategory$(id)
      .subscribe({
        next: () => {
          this.toastService.success('Panier supprimé avec Succès'),
            this.refreshCategory$.next();
        },
        error: (error) =>
          this.toastService.error("Une erreur s'est produite lors de la suppression"),
      });
  }

  onSubmit(): void {
    if (this.name) {
      const formData = new FormData();
      formData.append('file', this.picture);

      if (this.edit) {
        if (this.activeCategory !== undefined) {
          if (this.picture) {
            this.editSubscription$ = this.imageService
              .addImage$(formData, 'category')
              .pipe(
                switchMap((picture) =>
                  this.categoryService.editCategory$(this.name, picture.file, this.activeCategory!)
                )
              )
              .subscribe({
                next: () => {
                  this.toastService.success('Catégorie modifiée avec succès.');
                  this.refreshCategory$.next();
                },
                error: (error) =>
                  this.toastService.error("Une erreur s'est produite lors de la modification de la catégorie."),
              });
          } else {
            this.editSubscription$ = this.categoryService
              .editCategory$(this.name, this.picturePath, this.activeCategory!)
              .subscribe({
                next: () => {
                  this.toastService.success('Catégorie modifiée avec succès.');
                  this.refreshCategory$.next();
                },
                error: (error) =>
                  this.toastService.error("Une erreur s'est produite lors de la modification de la catégorie."),
              });
          }
        }
      } else {
        this.postSubscription$ = this.imageService
          .addImage$(formData, 'category')
          .pipe(
            switchMap((picture) =>
              this.categoryService.addCategory$(this.name, picture.file)
            )
          )
          .subscribe({
            next: () => {
              this.toastService.success('Catégorie ajoutée avec succès.');
              this.refreshCategory$.next();
            },
            error: (error) =>
              this.toastService.error("Une erreur s'est produite lors de l'ajout de la catégorie."),
          });
      }
    } else {
      this.toastService.error('Veuillez remplir les champs.');
    }
  }

  ngOnDestroy(): void {
    this.postSubscription$.unsubscribe();
    this.editSubscription$.unsubscribe();
    this.deleteSubscription$.unsubscribe();
  }
}
