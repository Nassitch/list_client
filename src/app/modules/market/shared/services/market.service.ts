import { inject, Injectable } from '@angular/core';
import { UserService } from '../../../user/shared/services/user.service';
import { environment } from '../../../../../environments/environment.developpment';
import { Observable } from 'rxjs';
import { Market } from '../../models/market.interface';
import { HttpClient } from '@angular/common/http';
import { DeleteMsg } from '../../../shared-components/models/delete-msg.interface';
import { MarketResponse } from '../../models/market-response.interface';

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
  private _READ_ALL: string = environment._READ_ALL;
  private _CREATE: string = environment._CREATE;
  private _UPDATE: string = environment._UPDATE;
  private _DELETE: string = environment._DELETE;

  getAllMarket$(): Observable<Market[]> {
    this.userService.initialize();
    return this.http.get<Market[]>(`${this._BASE_URL}${this._PUBLIC}${this._MARKET}${this._READ_ALL}`);
  }

  addMarket$(name: string, size: string, place: string, picture: string): Observable<MarketResponse> {
    const market = {
      name: name,
      size: size,
      place: place,
      picture: picture,
    }
    return this.http.post<MarketResponse>(`${this._BASE_URL}${this._ADMIN}${this._MARKET}${this._CREATE}`, market);
  }

  editMarket$(name: string, size: string, place: string, picture: string, id: number): Observable<MarketResponse> {
    const market = {
      name: name,
      size: size,
      place: place,
      picture: picture,
    }
    return this.http.put<MarketResponse>(`${this._BASE_URL}${this._ADMIN}${this._MARKET}${this._UPDATE}/${id}`, market);
  }

  deleteMarket$(id: number): Observable<DeleteMsg> {
    return this.http.delete<DeleteMsg>(`${this._BASE_URL}${this._ADMIN}${this._MARKET}${this._DELETE}/${id}`);
  }
}
