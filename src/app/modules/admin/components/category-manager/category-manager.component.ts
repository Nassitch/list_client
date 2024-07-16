import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../category/shared/services/category.service';
import { BehaviorSubject, Observable, Subscription, switchMap } from 'rxjs';
import { Category } from '../../../category/models/category.interface';
import { ToastService } from '../../../shared-components/services/toast.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { assertFormControl } from '../../../shared-components/utils/assert-form-control.util';
import { ImageService } from '../../../shared-components/services/image.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrl: './category-manager.component.css'
})
export class CategoryManagerComponent implements OnInit, OnDestroy {

  @ViewChild('inputField') inputField!: ElementRef;

  private refreshCategory$ = new BehaviorSubject<void>(undefined);

  private toastService = inject(ToastService);
  private imageService = inject(ImageService);
  protected categoryService = inject(CategoryService);

  categoryList$!: Observable<Category[]>;

  deleteSubscription$: Subscription = new Subscription();

  activeCategory?: number;
  categoryContent: string = "category";
  name: string = "";
  picture: string = "";
  textBtn: string = "Enregistrer";

  ngOnInit(): void {
    this.categoryList$ = this.refreshCategory$
      .pipe(
        switchMap(() => {
          console.log("Refreshing category list...");
          return this.categoryService.getAllCategories$();
        })
      );

  }

  onCardClick(id: number): void {
    this.activeCategory = (this.activeCategory === id) ? undefined : id;
  }

  focusInput():void {
    this.inputField.nativeElement.focus();
  }

  getPicturePath(path: string): string {
    const startIndex = path.lastIndexOf('\\') + 1;
    const fileName = path.substring(startIndex);

    return fileName;
  }

  onDelete(id: number): void {
    this.deleteSubscription$ = this.categoryService.deleteCategory$(id).subscribe({
      next: () => {
        this.toastService.success("Panier supprimé avec Succès"),
        this.refreshCategory$.next()
      },
      error: (error) => this.toastService.error("Une erreur s'est produite lors de la suppression")
    });
  }

  onSubmit(): void {

    this.picture = this.getPicturePath(this.picture);
    console.log(this.picture);

    this.imageService.addImage$(this.picture, "category");
  }

  ngOnDestroy(): void {
    this.deleteSubscription$.unsubscribe();
  }
}
