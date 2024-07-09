import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.developpment';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  private _BASE_URL: string = environment._BASE_URL;
  private _PUBLIC: string = environment._PUBLIC;
  private _CATEGORY: string = environment._CATEGORY;
  private _UPLOAD: string = environment._UPLOAD;
  private _READ_ALL: string = environment._READ_ALL;
  private _READ: string = environment._READ;

  public readonly _BASE_URL_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._CATEGORY}/`;

  getAllCategories$(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this._BASE_URL}${this._PUBLIC}${this._CATEGORY}${this._READ_ALL}`);
  }
}
