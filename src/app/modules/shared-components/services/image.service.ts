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
  private _UPLOAD: string = environment._UPLOAD;
  private _READ_ALL: string = environment._READ_ALL;
  private _READ: string = environment._READ;
  private _CREATE: string = environment._CREATE;
  private _DELETE: string = environment._DELETE;

  addImage$(formData: FormData, directory: string): Observable<any> {
    return this.http.post(`${this._BASE_URL}${this._ADMIN}${this._UPLOAD}${this._CREATE}/${directory}`, formData);
  }

  deleteImage$(image: string, directory: string): Observable<any> {
    return this.http.delete(`${this._BASE_URL}${this._ADMIN}${this._UPLOAD}${this._CREATE}/${directory}/${image}`);
  }
}
