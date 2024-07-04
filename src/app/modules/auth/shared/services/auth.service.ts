import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment.developpment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected http = inject(HttpClient)

  private _BASE_URL: string = environment._BASE_URL;
  private _AUTH: string = environment._AUTH;
  private _AUTHENTIFICATE: string = environment._AUTHENTIFICATE;
  private _REGISTER: string = environment._REGISTER;

  login$(email: string, password: string): Observable<any> {
    return this.http.post(`${this._BASE_URL}${this._AUTH}${this._AUTHENTIFICATE}`, {email, password})
  }

  signup$(pseudo: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this._BASE_URL}${this._AUTH}${this._REGISTER}`, {pseudo, email, password})
  }
}
