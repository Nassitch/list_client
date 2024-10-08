import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.developpment';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.interface';
import { ItemRequest } from '../../models/item-request.class';
import { DeleteMsg } from '../../../shared-components/models/delete-msg.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private http: HttpClient = inject(HttpClient);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _ADMIN: string = environment._ADMIN;
  private readonly _PUBLIC: string = environment._PUBLIC;
  private readonly _CATEGORY: string = environment._CATEGORY;
  private readonly _ITEM: string = environment._ITEM;
  private readonly _READ: string = environment._READ;
  private readonly _CREATE: string = environment._CREATE;
  private readonly _UPDATE: string = environment._UPDATE;
  private readonly _DELETE: string = environment._DELETE;

  getItemFromCategory$(id: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this._BASE_URL}${this._PUBLIC}${this._ITEM}${this._READ}${this._CATEGORY}/${id}`);
  }

  addItem$(id: number, name: string): Observable<ItemRequest> {
    const item: ItemRequest = new ItemRequest(id, name);
    return this.http.post<ItemRequest>(`${this._BASE_URL}${this._ADMIN}${this._ITEM}${this._CREATE}`, item);
  }

  editItem$(idItem: number, name: string, idCategory: number): Observable<ItemRequest> {
    const item: ItemRequest = new ItemRequest(idCategory, name);
    return this.http.put<ItemRequest>(`${this._BASE_URL}${this._ADMIN}${this._ITEM}${this._UPDATE}/${idItem}`, item);
  }

  deleteItem$(id: number): Observable<DeleteMsg> {
    return this.http.delete<DeleteMsg>(`${this._BASE_URL}${this._ADMIN}${this._ITEM}${this._DELETE}/${id}`);
  }
}
