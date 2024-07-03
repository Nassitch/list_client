import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.developpment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private _BASE_URL: string = environment._BASE_URL;
  private _PUBLIC: string = environment._PUBLIC;
  private _UPLOAD: string = environment._UPLOAD;
  private _READ_ALL: string = environment._READ_ALL;

  getAvatars$(): Observable<string[]> {
    return this.http.get<string[]>(`${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ_ALL}/avatar`);
  }
}
