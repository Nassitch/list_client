import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryService } from '../../../category/shared/services/category.service';
import { ItemService } from '../../../item/shared/service/item.service';
import { Category } from '../../../category/models/category.interface';
import { ImageService } from '../../../shared-components/services/image.service';
import { Item } from '../../../item/models/item.interface';

@Component({
  selector: 'app-item-manager',
  templateUrl: './item-manager.component.html',
  styleUrl: './item-manager.component.css'
})
export class ItemManagerComponent implements OnInit {
  @ViewChild('inputField') inputField!: ElementRef;
  private refreshItem = new BehaviorSubject<void>(undefined);

  private categoryService = inject(CategoryService);
  private itemService = inject(ItemService);
  public imageService = inject(ImageService);

  categoryList$!: Observable<Category[]>;
  itemList$!: Observable<Item[]>;

  categoryContent: string = "category";
  activeCategory?: number;
  name: string = "";
  textBtn: string = "Enregistrer";

  ngOnInit(): void {
    this.categoryList$ = this.categoryService.getAllCategories$();
  }

  onCardClick(id: number): void {
    this.itemList$ = this.itemService.getItemFromCategory$(id);
    this.activeCategory = this.activeCategory === id ? undefined : id;
  }

  focusInput(): void {
    this.inputField.nativeElement.focus();
  }

  onSubmit(): void {}
}
