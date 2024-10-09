import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.developpment';
import {ImageType} from "../../../models/image.interface";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private http: HttpClient = inject(HttpClient);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _ADMIN: string = environment._ADMIN;
  private readonly _PUBLIC: string = environment._PUBLIC;
  private readonly _CATEGORY: string = environment._CATEGORY;
  private readonly _AVATAR: string = environment._AVATAR;
  private readonly _MARKET: string = environment._MARKET;
  private readonly _UPLOAD: string = environment._UPLOAD;
  private readonly _READ: string = environment._READ;
  private readonly _CREATE: string = environment._CREATE;
  private readonly _DELETE: string = environment._DELETE;

  public readonly _BASE_URL_CATEGORY_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._CATEGORY}/`;
  public readonly _BASE_URL_USER_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._AVATAR}`;
  public readonly _BASE_URL_MARKET_IMG: string = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._MARKET}/`;

  addImage$(formData: FormData, directory: string): Observable<ImageType> {
    return this.http.post<ImageType>(`${this._BASE_URL}${this._ADMIN}${this._UPLOAD}${this._CREATE}/${directory}`, formData);
  }

  deleteImage$(image: string, directory: string): Observable<string> {
    return this.http.delete<string>(`${this._BASE_URL}${this._ADMIN}${this._UPLOAD}${this._DELETE}/${directory}/${image}`);
  }
}
