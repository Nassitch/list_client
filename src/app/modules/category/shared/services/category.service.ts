import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.developpment';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Category } from '../../models/category.interface';
import { StorageService } from '../../../../core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryList$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  private http = inject(HttpClient);

  private _BASE_URL: string = environment._BASE_URL;
  private _ADMIN: string = environment._ADMIN;
  private _PUBLIC: string = environment._PUBLIC;
  private _CATEGORY: string = environment._CATEGORY;
  private _UPLOAD: string = environment._UPLOAD;
  private _READ_ALL: string = environment._READ_ALL;
  private _READ: string = environment._READ;
  private _CREATE: string = environment._CREATE;
  private _DELETE: string = environment._DELETE;

  public readonly _BASE_URL_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._CATEGORY}/`;

  getAllCategories$(): Observable<Category[]> {
    const storedCategories = this.categoryList$.getValue();
    if (storedCategories.length > 0) {
      return of(storedCategories);
    } else {
      return this.http.get<Category[]>(`${this._BASE_URL}${this._PUBLIC}${this._CATEGORY}${this._READ_ALL}`)
      .pipe(
        tap((categories: Category[]) => this.categoryList$.next(categories))
      );
    }
  }

  getCategory$(id: number): Observable<Category> {
    return this.http.get<Category>(`${this._BASE_URL}${this._PUBLIC}${this._CATEGORY}${this._READ}/${id}`);
  }

  addCategory$(name: string, picture: string): Observable<any> {
    const category = {
      name: name,
      picture: picture,
    }
    return this.http.post(`${this._BASE_URL}${this._ADMIN}${this._CATEGORY}${this._CREATE}`,  category);
  }

  deleteCategory$(id: number): Observable<{ id: number }> {
    return this.http.delete(`${this._BASE_URL}${this._ADMIN}${this._CATEGORY}${this._DELETE}/${id}`, { responseType: 'text' })
    .pipe(map((response: string) => ({ id: Number(response) })));
  }
}
