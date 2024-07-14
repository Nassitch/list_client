import { inject, Injectable } from '@angular/core';
import { UserService } from '../../../user/shared/services/user.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Shop } from '../../models/shop.interface';
import { environment } from '../../../../../environments/environment.developpment';
import { Category } from '../../../category/models/category.interface';
import { StorageService } from '../../../../core/services/storage.service';
import { ShopClass } from '../../models/shop.class';
import { ToastService } from '../../../shared-components/services/toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private storageService = inject(StorageService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  private _BASE_URL: string = environment._BASE_URL;
  private _USER: string = environment._USER;
  private _SHOP: string = environment._SHOP;
  private _READ_ALL: string = environment._READ_ALL;
  private _CREATE: string = environment._CREATE;
  private _DELETE: string = environment._DELETE;

  getShopFromUser$(): Observable<Shop[]> {
    this.userService.initialize();
    return this.http.get<Shop[]>(
      `${this._BASE_URL}${this._USER}${this._SHOP}${this._READ_ALL}/${this.userService.id}`
    );
  }

  getShop$(): Observable<Category[]> {
    const shopSave = this.storageService.getItem('shop');
    if (shopSave) {
      return of(JSON.parse(shopSave));
    } else {
      return of([]);
    }
  }

  saveShop(category: Category): void {
    const existShop: Category[] =
      JSON.parse(this.storageService.getItem('shop')) || [];

    const updatedShop = existShop.map((cat) =>
      cat.id === category.id ? category : cat
    );
    if (!updatedShop.some((cat) => cat.id === category.id)) {
      updatedShop.push(category);
    }

    this.storageService.setItem('shop', JSON.stringify(updatedShop));
  }

  addShop$() {
    this.userService.initialize();
    const categories: Category[] = JSON.parse(this.storageService.getItem('shop')) || [];
    let itemIds: number[] = [];
    categories.forEach((category) => {
      itemIds = itemIds.concat(category.items.map((item) => item.id));
    });
    const shopToSave = new ShopClass(itemIds, this.userService.id);
    this.storageService.removeItem('shop');

    return this.http
      .post(
        `${this._BASE_URL}${this._USER}${this._SHOP}${this._CREATE}`,
        shopToSave
      )
      .pipe(
        map((response) => {
          this.toastService.show('Votre Panier à bien été validé.', 'Succès', 'success');
          this.router.navigate(['/invoice']);
          return response;
        }),
        catchError((error) => {
          this.toastService.show("Une erreu s'est produite lors de la validation du Panier.", 'Erreur', 'error');
          return error;
        })
      );
  }

  deleteShop$(id: number): Observable<{ id: number }> {
    return this.http
      .delete(
        `${this._BASE_URL}${this._USER}${this._SHOP}${this._DELETE}/${id}`,
        { responseType: 'text' }
      )
      .pipe(map((response: string) => ({ id: Number(response) })));
  }
}
