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

  // Mise à jour du token
  updateToken(tokenFromDB: TokenResponse) {
    // Remise à zéro des cookies puis ajout du nouveau Token reçu du serveur
    this._clearCookiesAndThenPutNewToken(tokenFromDB);
    // Décoder le Token pour accéder à son corps (où les Claims sont accessibles, notamment le ROLE du user)
    const decodedToken = this._decodeToken(tokenFromDB);
    // Mise à disposition du corps du token extrait précédemment dans un BehaviorSubject afin de notifier les composants/services qui sont subscribe() lorsque le token change de valeur
    this._setTokenDetailsSubject$(decodedToken);
  }

  getTokenFromCookiesAndDecode(): any {
    // On récupère le token stocké dans les cookies
    const tokenId = this.cookieService.getCookie('authToken');
    // S'il y en a un
    if (tokenId) {
      // Je retourne la valeur décodée du token (le corps du token)   
      return this._decodeToken({ token: tokenId });
    } else {
      // Sinon je retourne null
      return null;
    }
  }

  resetToken(): void {
    this.cookieService.deleteCookie('authToken');
  }

  // Je réinitialise les cookies puis j'y place mon nouveau Token
  private _clearCookiesAndThenPutNewToken(
    tokenFromDB: TokenResponse
  ): void {
    this.cookieService.deleteCookie('authToken');
    this.cookieService.setCookie('authToken', tokenFromDB.token, 7);
  }

  // Je décode mon token (comme le fait jwt.io) afin d'en extraire le CORPS et y récupérer les CLAIMS (rôle de l'utilisateur, son email, expiration...)
  private _decodeToken(tokenFromDB: TokenResponse): any {
    return this._getDecodedTokenResponse(tokenFromDB.token);
  }

  // Je décode le token
  private _getDecodedTokenResponse(token: string): any {
    // J'utilise une librairie pour décoder le corps du token
    return jwtDecode(token);
  }

  // Je "pousse" une nouvelle valeur dans la propriété _tokenDetailsSubject$ (en l'occurence ici : le corps du token décodé)
  private _setTokenDetailsSubject$(tokenInfos: any): void {
    this._tokenDetailsSubject$.next(tokenInfos);
  }

  // J'expose ma propriété _tokenDetailsSubject$ en tant qu'Observable, afin que chaque composant/service qui y soit .subscribe() soit notifié s'il y a un nouveau token.
  _getTokenDetailsSubject$(): Observable<any> {
    return this._tokenDetailsSubject$.asObservable();
  }
}