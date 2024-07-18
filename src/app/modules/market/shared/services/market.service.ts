import { inject, Injectable } from '@angular/core';
import { UserService } from '../../../user/shared/services/user.service';
import { environment } from '../../../../../environments/environment.developpment';
import { Observable } from 'rxjs';
import { Market } from '../../models/market.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private http = inject(HttpClient);
  private userService = inject(UserService);

  private _BASE_URL: string = environment._BASE_URL;
  private _ADMIN: string = environment._ADMIN;
  private _PUBLIC: string = environment._PUBLIC;
  private _MARKET: string = environment._MARKET;
  private _UPLOAD: string = environment._UPLOAD;
  private _READ: string = environment._READ;
  private _READ_ALL: string = environment._READ_ALL;
  private _DELETE: string = environment._DELETE;

  getAllMarket$(): Observable<Market[]> {
    this.userService.initialize();
    return this.http.get<Market[]>(`${this._BASE_URL}${this._PUBLIC}${this._MARKET}${this._READ_ALL}`);
  }

  deleteMarket$(id: number): Observable<any> {
    return this.http.delete(`${this._BASE_URL}${this._ADMIN}${this._MARKET}${this._DELETE}/${id}`);
  }
}
