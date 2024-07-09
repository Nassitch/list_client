import { BehaviorSubject, catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { UserToken } from '../../../../models/user-token.interface';
import { UserInfo } from '../../../user/models/user-info.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthRequest } from '../../models/auth-request.interface';
import { TokenResponse } from '../../../../models/token-response.interface';
import { environment } from '../../../../../environments/environment.developpment';
import { ToastService } from '../../../shared-components/services/toast.service';
import { Router } from '@angular/router';
import { CookieService } from '../../../../core/services/cookie.service';
import { TokenService } from '../../../../core/services/token.service';
import { inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private currentUser: BehaviorSubject<UserToken | null> =
    new BehaviorSubject<UserToken | null>(null);

  protected http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private tokenService = inject(TokenService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _AUTH: string = environment._AUTH;
  private readonly _AUTHENTIFICATE: string = environment._AUTHENTIFICATE;
  private readonly _REGISTER_LOG: string = environment._REGISTER_LOG;
  private readonly _REGISTER_USER: string = environment._REGISTER_USER;

  ngOnInit(): void {
    this.initializeCurrentUser();
  }

  login$(user: AuthRequest): Observable<any> {
    return this.http
      .post(`${this._BASE_URL}${this._AUTH}${this._AUTHENTIFICATE}`, user)
      .pipe(
        tap((response: any) => {
          this.cookieService.setCookie('authToken', response.token, 0.1);

          const decodedToken = this.tokenService.getTokenFromCookiesAndDecode();
          if (decodedToken) {
            const userInfo: UserToken = {
              userId: decodedToken.userId,
              loginId: decodedToken.loginId,
              role: decodedToken.role,
              picture: decodedToken.picture,
            };

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
      );
  }

  logout(): void {
    this.tokenService.resetToken();
    this.toastService.show('Déconnexion réussie', 'Succès', 'success');
    this.router.navigate(['/login']);
    this.currentUser.next(null);
  }

  signup$(newUser: AuthRequest): Observable<any> {
    return this.http
      .post(`${this._BASE_URL}${this._AUTH}${this._REGISTER_LOG}`, newUser)
      .pipe(
        mergeMap((user: any) =>
          this.login$(newUser).pipe(
            catchError((authError) => {
              console.error('Error while logging in:', authError);
              return of(null);
            }),
            map(() => ({
              success: true,
              message: 'Inscription et connexion réussies',
            }))
          )
        ),
        catchError((error: HttpErrorResponse) => {
          console.error("Erreur lors de l'inscription:", error);
          return of({
            success: false,
            message: "Erreur lors de l'inscription",
          });
        })
      );
  }

  register$(userInfo: UserInfo): Observable<any> {
    return this.http.post(
      `${this._BASE_URL}${this._AUTH}${this._REGISTER_USER}`,
      userInfo
    );
  }

  private initializeCurrentUser(): void {
    const decodedToken = this.tokenService.getTokenFromCookiesAndDecode();
    if (decodedToken) {
      const userInfo: UserToken = {
        userId: decodedToken.userId,
        loginId: decodedToken.loginId,
        role: decodedToken.role,
        picture: decodedToken.picture,
      };
      this.setCurrentUser(userInfo);
    }
  }

  getCurrentUser(): Observable<UserToken | null> {
    if (!this.currentUser.getValue()) {
      this.initializeCurrentUser();
    }
    return this.currentUser.asObservable();
  }

  setCurrentUser(user: UserToken): void {
    this.currentUser.next(user);
  }
}