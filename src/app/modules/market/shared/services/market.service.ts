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

  private http: HttpClient = inject(HttpClient);
  private userService: UserService = inject(UserService);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _ADMIN: string = environment._ADMIN;
  private readonly _PUBLIC: string = environment._PUBLIC;
  private readonly _MARKET: string = environment._MARKET;
  private readonly _READ_ALL: string = environment._READ_ALL;
  private readonly _CREATE: string = environment._CREATE;
  private readonly _UPDATE: string = environment._UPDATE;
  private readonly _DELETE: string = environment._DELETE;

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
