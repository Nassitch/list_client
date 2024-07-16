import { inject, Injectable } from '@angular/core';
import { UserService } from '../../../user/shared/services/user.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Shop } from '../../models/shop.interface';
import { environment } from '../../../../../environments/environment.developpment';
import { Category } from '../../../category/models/category.interface';
import { StorageService } from '../../../../core/services/storage.service';
import { ShopSave } from '../../models/shop-save.class';
import { ToastService } from '../../../shared-components/services/toast.service';
import { Router } from '@angular/router';
import { Item } from '../../../item/models/item.interface';
import { ShopEdit } from '../../models/shop-edit.class';

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
  private _READ: string = environment._READ;
  private _READ_ALL: string = environment._READ_ALL;
  private _CREATE: string = environment._CREATE;
  private _UPDATE: string = environment._UPDATE;
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

  getShopById$(id: number): Observable<Shop> {
    return this.http.get<Shop>(`${this._BASE_URL}${this._USER}${this._SHOP}${this._READ}/${id}`);
  }

  getShopIntoLS(): Category[] {
    const shopSave = this.storageService.getItem("shop");
    return shopSave ? JSON.parse(shopSave) : [];
}

saveShop(categories: Category[]): void {
  this.storageService.setItem('shop', JSON.stringify(categories));
}

  addShop$(items: Item[]) {
    this.userService.initialize();
    const itemIds = items.map(item => item.id);
    const shopToSave = new ShopSave(itemIds, this.userService.id);
    this.storageService.removeItem('shop');
    
    return this.http
    .post(`${this._BASE_URL}${this._USER}${this._SHOP}${this._CREATE}`, shopToSave)
    .pipe(
      map((response) => {
        this.toastService.success('Votre Panier à bien été validé.');
        this.router.navigate(['/invoice']);
        return response;
      }),
      catchError((error) => {
        this.toastService.error("Une erreur s'est produite lors de la validation du Panier.");
        return of(error);
      })
    );
  }
  
  editShop$(items: Item[], id: number): Observable<any> {
    this.userService.initialize();
    const itemIds = items.map(item => item.id);
    const shopToSave = new ShopEdit(itemIds, this.userService.id);
    this.storageService.removeItem('shop');

    return this.http
    .put(`${this._BASE_URL}${this._USER}${this._SHOP}${this._UPDATE}/${id}`, shopToSave)
    .pipe(
      map((response) => {
        this.toastService.success('Votre Panier à bien été modifier.');
        this.router.navigate(['/invoice']);
        return response;
      }),
      catchError((error) => {
        this.toastService.error("Une erreur s'est produite lors de la modifiaction de votre Panier.");
        return of(error);
      })
    );
  }

  deleteShop$(id: number): Observable<{ id: number }> {
    return this.http.delete(`${this._BASE_URL}${this._USER}${this._SHOP}${this._DELETE}/${id}`, { responseType: 'text' })
      .pipe(map((response: string) => ({ id: Number(response) })));
  }
}
