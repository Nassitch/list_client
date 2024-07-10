import { inject, Injectable } from '@angular/core';
import { UserService } from '../../../user/shared/services/user.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Shop } from '../../models/shop.interface';
import { environment } from '../../../../../environments/environment.developpment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private http = inject(HttpClient);
  private userService = inject(UserService);

  private _BASE_URL: string = environment._BASE_URL;
  private _USER: string = environment._USER;
  private _SHOP: string = environment._SHOP;
  private _READ_ALL: string = environment._READ_ALL;
  private _DELETE: string = environment._DELETE;

  getShopFromUser$(): Observable<Shop[]> {
    this.userService.initialize();
    return this.http.get<Shop[]>(`${this._BASE_URL}${this._USER}${this._SHOP}${this._READ_ALL}/${this.userService.id}`);
  }

  deleteShop$(id: number): Observable<{ id: number }> {
    return this.http.delete(`${this._BASE_URL}${this._USER}${this._SHOP}${this._DELETE}/${id}`, { responseType: 'text' }).pipe(
      map((response: string) => ({ id: Number(response) }))
    );
  }
}
