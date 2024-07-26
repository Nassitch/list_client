import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.developpment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Category } from '../../models/category.interface';
import { CategoryRequest } from '../../models/category-request.interface';
import { DeleteMsg } from '../../../shared-components/models/delete-msg.interface';
import { CategoryResponse } from '../../models/category-response.interface';

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
  private _READ_ALL: string = environment._READ_ALL;
  private _READ: string = environment._READ;
  private _CREATE: string = environment._CREATE;
  private _UPDATE: string = environment._UPDATE;
  private _DELETE: string = environment._DELETE;

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

  addCategory$(name: string, picture: string): Observable<CategoryResponse> {
    const category: CategoryRequest = {
      name: name,
      picture: picture,
    }
    return this.http.post<CategoryResponse>(`${this._BASE_URL}${this._ADMIN}${this._CATEGORY}${this._CREATE}`,  category);
  }
  
  editCategory$(name: string, picture: string, id: number): Observable<CategoryResponse> {
      const category: CategoryRequest = {
        name: name,
        picture: picture,
      }
      return this.http.put<CategoryResponse>(`${this._BASE_URL}${this._ADMIN}${this._CATEGORY}${this._UPDATE}/${id}`, category);
  }

  deleteCategory$(id: number): Observable<DeleteMsg> {
    return this.http.delete<DeleteMsg>(`${this._BASE_URL}${this._ADMIN}${this._CATEGORY}${this._DELETE}/${id}`);
  }
}
