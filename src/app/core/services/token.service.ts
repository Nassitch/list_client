import { Injectable, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from './cookie.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenResponse } from '../../models/token-response.interface';
import { ToastService } from '../../modules/shared-components/services/toast.service';
import { Router } from '@angular/router';
import { TokenDecrypted } from '../../models/token-decrypted.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _tokenDetailsSubject$: BehaviorSubject<TokenDecrypted | null> =
  new BehaviorSubject<TokenDecrypted | null>(null);

  private cookieService: CookieService = inject(CookieService);
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);

  constructor() {
    this.getTokenFromCookiesAndDecode();
  }

  updateToken(tokenFromDB: TokenResponse): void {
    this._clearCookiesAndThenPutNewToken(tokenFromDB);
    const decodedToken: TokenDecrypted = this._decodeToken(tokenFromDB);
    this._setTokenDetailsSubject$(decodedToken);
  }

  getTokenFromCookiesAndDecode(): TokenDecrypted | null {
    const tokenId: string | null = this.cookieService.getCookie('authToken');
    if (tokenId) {
      const decodedToken: TokenDecrypted = this._decodeToken({ token: tokenId });
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
    this.cookieService.setCookie('authToken', tokenFromDB.token, 7, true, 'Strict');
  }

  private _decodeToken(tokenFromDB: TokenResponse): TokenDecrypted {
    return this._getDecodedTokenResponse(tokenFromDB.token);
  }

  private _getDecodedTokenResponse(token: string): TokenDecrypted {
    return jwtDecode(token);
  }

  private _isTokenExpired(decodedToken: TokenDecrypted): boolean {
    const currentTime: number = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }

  private _setTokenDetailsSubject$(tokenInfos: TokenDecrypted): void {
    this._tokenDetailsSubject$.next(tokenInfos);
  }

  _getTokenDetailsSubject$(): Observable<TokenDecrypted | null> {
    return this._tokenDetailsSubject$.asObservable();
  }
}
