import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { UserToken } from '../../../../models/user-token.interface';
import { UserInfo } from '../../../user/models/user-info.interface';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../../models/auth-request.interface';
import { TokenResponse } from '../../../../models/token-response.interface';
import { environment } from '../../../../../environments/environment.developpment';
import { ToastService } from '../../../shared-components/services/toast.service';
import { Router } from '@angular/router';
import { CookieService } from '../../../../core/services/cookie.service';
import { TokenService } from '../../../../core/services/token.service';
import { inject, Injectable } from '@angular/core';
import { LogResponse } from '../../models/log-response.interface';
import { TokenDecrypted } from '../../../../models/token-decrypted.interface';
import { LogMessageResponse } from '../../models/log-message-response.interface';
import { SignupResponse } from '../../models/signup-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: BehaviorSubject<UserToken | null> =
    new BehaviorSubject<UserToken | null>(null);
  private logInfoUser: BehaviorSubject<AuthRequest | null> = new BehaviorSubject<AuthRequest | null>(null);
  public currentUserId: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(undefined);

  protected http: HttpClient = inject(HttpClient);
  private cookieService: CookieService = inject(CookieService);
  private tokenService: TokenService = inject(TokenService);
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _AUTH: string = environment._AUTH;
  private readonly _AUTHENTIFICATE: string = environment._AUTHENTIFICATE;
  private readonly _REGISTER_LOG: string = environment._REGISTER_LOG;
  private readonly _REGISTER_USER: string = environment._REGISTER_USER;

  constructor() {
    this.initializeCurrentUser();
  }

  login$(user: AuthRequest): Observable<LogMessageResponse> {
    return this.http
      .post<LogResponse>(`${this._BASE_URL}${this._AUTH}${this._AUTHENTIFICATE}`, user)
      .pipe(
        tap((response: LogResponse) => {
          this.cookieService.setCookie('authToken', response.token, 1, true, 'Strict');

          const decodedToken: TokenDecrypted | null = this.tokenService.getTokenFromCookiesAndDecode();
          if (decodedToken) {
            const userInfo: UserToken = {
              userId: decodedToken.userId!,
              loginId: decodedToken.loginId,
              role: decodedToken.role,
              picture: decodedToken.picture,
            };

            this.setCurrentUser(userInfo);
          }
        }),
        map((response: TokenResponse) => ({
          success: true,
          token: response.token,
          message: `Bienvenue `,
        })),
        catchError(() => {
          return of({ success: false, message: 'Identifiants invalides' });
        })
      );
  }

  logout(): void {
    this.tokenService.resetToken();
    this.toastService.success('Déconnexion réussie');
    this.router.navigate(['/login']);
    this.currentUser.next(null);
  }

  signup$(newUser: AuthRequest): Observable<LogMessageResponse> {
    this.logInfoUser.next(newUser);
    return this.http.post<SignupResponse>(`${this._BASE_URL}${this._AUTH}${this._REGISTER_LOG}`, newUser)
      .pipe(
        tap(response => {
          this.currentUserId.next(response.id);
        }),
        map(response => ({
          success: true,
          message: response.message,
          id: response.id
        })),
        catchError(() => {
          return of({
            success: false,
            message: "Erreur lors de l'inscription",
          });
        })
      );
  }

  register$(userInfo: UserInfo): Observable<{ success: boolean; message: string }> {
    return this.http.post<SignupResponse>(
      `${this._BASE_URL}${this._AUTH}${this._REGISTER_USER}`,
      userInfo
    ).pipe(
      switchMap(() => {
        const authRequest: AuthRequest | null = this.logInfoUser.getValue();
        if (!authRequest) {
          return of({
            success: false,
            message: "Erreur lors de l'inscription : informations utilisateur manquantes",
          });
        }
        return this.login$(authRequest).pipe(
          catchError(() => {
            return of(null);
          }),
          map((): { message: string; success: boolean } => ({
            success: true,
            message: 'Inscription et connexion réussies',
          }))
        );
      }),
      catchError(() => {
        return of({
          success: false,
          message: "Erreur lors de l'inscription",
        });
      })
    );
  }

  private initializeCurrentUser(): void {
    const decodedToken: TokenDecrypted | null = this.tokenService.getTokenFromCookiesAndDecode();
    if (decodedToken) {
      const userInfo: UserToken = {
        userId: decodedToken.userId!,
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
