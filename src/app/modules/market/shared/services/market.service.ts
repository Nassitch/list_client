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
  private _PUBLIC: string = environment._PUBLIC;
  private _MARKET: string = environment._MARKET;
  private _UPLOAD: string = environment._UPLOAD;
  private _READ: string = environment._READ;
  private _READ_ALL: string = environment._READ_ALL;

  public readonly _BASE_URL_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._MARKET}/`;

  getAllMarket$(): Observable<Market[]> {
    this.userService.initialize();
    console.log("The user id is :", this.userService.id);
    return this.http.get<Market[]>(`${this._BASE_URL}${this._PUBLIC}${this._MARKET}${this._READ_ALL}`);
  }
}
