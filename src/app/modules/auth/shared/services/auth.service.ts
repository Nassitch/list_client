import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment.developpment';
import { BehaviorSubject, catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { CookieService } from '../../../../core/services/cookie.service';
import { TokenService } from '../../../../core/services/token.service';
import { UserToken } from '../../../../models/user-token.interface';
import { TokenResponse } from '../../../../models/token-response.interface';
import { AuthRequest } from '../../models/auth-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser = new BehaviorSubject<UserToken | null>(null);

  protected http = inject(HttpClient)
  private cookieService = inject(CookieService);
  private tokenService = inject(TokenService);

  private _BASE_URL: string = environment._BASE_URL;
  private _AUTH: string = environment._AUTH;
  private _AUTHENTIFICATE: string = environment._AUTHENTIFICATE;
  private _REGISTER: string = environment._REGISTER;

  login$(user: AuthRequest): Observable<any> {
    return this.http.post(`${this._BASE_URL}${this._AUTH}${this._AUTHENTIFICATE}`, user)
    .pipe(
      tap((response: any) => {
        this.cookieService.setCookie('authToken', response.token, 0.1);

        const decodedToken = this.tokenService.getTokenFromCookiesAndDecode();
        if (decodedToken) {

          const userInfo: UserToken = {
            userId: decodedToken.userId,
            loginId: decodedToken.loginId,
            role: decodedToken.role,
          }

          this.setCurrentUser(userInfo);
          console.log('Current User after login:', userInfo);
        }
        
      }),
      map((response: TokenResponse) => ({
        success: true,
        token: response.token,
        message: `Bienvenue `,
      })),
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la connexion:', error);
        return of({ success: false, message: 'Identifiants invalides' });
      })
    )
  }

  signup$(newUser: AuthRequest): Observable<any> {
    return this.http.post(`${this._BASE_URL}${this._AUTH}${this._REGISTER}`, newUser)
    .pipe(
      mergeMap((user: any) => this.login$(newUser)
        .pipe(
          catchError((authError) => {
            console.error('Error while logging in:', authError);
            return of(null);
          }),
          map(() => ({
            success: true,
            message: 'Inscription et connexion réussies'
          }))
        )
      ),
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de l\'inscription:', error);
        return of({ success: false, message: 'Erreur lors de l\'inscription' });
      })
    );
  }

  getCurrentUser(): Observable<UserToken | null> {
    return this.currentUser.asObservable();
  }

  setCurrentUser(user: UserToken): void {
    this.currentUser.next(user);
  }
}
