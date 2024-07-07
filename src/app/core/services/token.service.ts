import { Injectable, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from './cookie.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenResponse } from '../../models/token-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  cookieService = inject(CookieService);
  private readonly _tokenDetailsSubject$: BehaviorSubject<any> =
    new BehaviorSubject<any>(this.getTokenFromCookiesAndDecode());

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
        this.resetToken();
        return null;
      }
      return decodedToken;
    } else {
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
    console.log(token);
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
