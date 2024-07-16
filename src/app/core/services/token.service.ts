import { Injectable, OnInit, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from './cookie.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenResponse } from '../../models/token-response.interface';
import { ToastService } from '../../modules/shared-components/services/toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements OnInit {
  private _tokenDetailsSubject$: BehaviorSubject<any> =
  new BehaviorSubject<any>([]);
  
  private cookieService = inject(CookieService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  ngOnInit(): void {
    this._tokenDetailsSubject$ = this.getTokenFromCookiesAndDecode();
  }

  updateToken(tokenFromDB: TokenResponse) {
    this._clearCookiesAndThenPutNewToken(tokenFromDB);
    const decodedToken = this._decodeToken(tokenFromDB);
    this._setTokenDetailsSubject$(decodedToken);
  }

  getTokenFromCookiesAndDecode(): any {
    const tokenId = this.cookieService.getCookie('authToken');
    if (tokenId) {
      const decodedToken = this._decodeToken({ token: tokenId });
      if (this._isTokenExpired(decodedToken)) {
        this.toastService.error('Votre session à expirée');
        this.resetToken();
        this.router.navigate(['/login']);
        return null;
      }
      return decodedToken;
    } else {
      this.router.navigate(['/login']);
      return null;
    }
  }

  resetToken(): void {
    this.cookieService.deleteCookie('authToken');
  }

  private _clearCookiesAndThenPutNewToken(tokenFromDB: TokenResponse): void {
    this.cookieService.deleteCookie('authToken');
    this.cookieService.setCookie('authToken', tokenFromDB.token, 7);
  }

  private _decodeToken(tokenFromDB: TokenResponse): any {
    return this._getDecodedTokenResponse(tokenFromDB.token);
  }

  private _getDecodedTokenResponse(token: string): any {
    return jwtDecode(token);
  }

  private _isTokenExpired(decodedToken: any): boolean {
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  private _setTokenDetailsSubject$(tokenInfos: any): void {
    this._tokenDetailsSubject$.next(tokenInfos);
  }

  _getTokenDetailsSubject$(): Observable<any> {
    return this._tokenDetailsSubject$.asObservable();
  }
}
