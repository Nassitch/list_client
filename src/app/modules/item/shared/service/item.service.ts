import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.developpment';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private http = inject(HttpClient);

  private _BASE_URL: string = environment._BASE_URL;
  private _ADMIN: string = environment._ADMIN;
  private _PUBLIC: string = environment._PUBLIC;
  private _CATEGORY: string = environment._CATEGORY;
  private _ITEM: string = environment._ITEM;
  private _READ_ALL: string = environment._READ_ALL;
  private _READ: string = environment._READ;
  private _CREATE: string = environment._CREATE;
  private _UPDATE: string = environment._UPDATE;
  private _DELETE: string = environment._DELETE;

  getItemFromCategory$(id: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this._BASE_URL}${this._PUBLIC}${this._ITEM}${this._READ}${this._CATEGORY}/${id}`);
  }
}
