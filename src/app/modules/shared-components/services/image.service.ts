import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.developpment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private http = inject(HttpClient);

  private _BASE_URL: string = environment._BASE_URL;
  private _ADMIN: string = environment._ADMIN;
  private _PUBLIC: string = environment._PUBLIC;
  private _CATEGORY: string = environment._CATEGORY;
  private _AVATAR: string = environment._AVATAR;
  private _MARKET: string = environment._MARKET;
  private _UPLOAD: string = environment._UPLOAD;
  private _READ_ALL: string = environment._READ_ALL;
  private _READ: string = environment._READ;
  private _CREATE: string = environment._CREATE;
  private _DELETE: string = environment._DELETE;

  public readonly _BASE_URL_CATEGORY_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._CATEGORY}/`;
  public readonly _BASE_URL_USER_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._AVATAR}`;
  public readonly _BASE_URL_MARKET_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._MARKET}/`;

  addImage$(formData: FormData, directory: string): Observable<any> {
    return this.http.post(`${this._BASE_URL}${this._ADMIN}${this._UPLOAD}${this._CREATE}/${directory}`, formData);
  }

  deleteImage$(image: string, directory: string): Observable<any> {
    return this.http.delete(`${this._BASE_URL}${this._ADMIN}${this._UPLOAD}${this._CREATE}/${directory}/${image}`);
  }
}
