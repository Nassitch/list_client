import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, switchMap } from 'rxjs';
import { environment } from '../../../../../environments/environment.developpment';
import { UserInfo } from '../../models/user-info.interface';
import { AuthService } from '../../../auth/shared/services/auth.service';
import {UserToken} from "../../../../models/user-token.interface";

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {

  private profileSubject: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);
  profile$: Observable<UserInfo | null>  = this.profileSubject.asObservable();

  private http: HttpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  public id!: number;
  private currentUserSubscription: Subscription | null = null;

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _ADMIN: string = environment._ADMIN;
  private readonly _PUBLIC: string = environment._PUBLIC;
  private readonly _USER: string = environment._USER;
  private readonly _UPLOAD: string = environment._UPLOAD;
  private readonly _THIS_USER: string = environment._THIS_USER;
  private readonly _READ: string = environment._READ;
  private readonly _READ_ALL: string = environment._READ_ALL;
  private readonly _UPDATE: string = environment._UPDATE;

  initialize(): void {
    this.currentUserSubscription = this.authService.getCurrentUser().subscribe((user: UserToken | null): void => {
      if (user) {
        this.id = user.userId;
      }
    });
  }

  upToDateProfile(profile: UserInfo): void {
    this.profileSubject.next(profile);
  }

  getAllUserProfile$(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(`${this._BASE_URL}${this._ADMIN}${this._USER}${this._READ_ALL}`);
  }

  getUserProfile$(): Observable<UserInfo> {
    return this.http.get<UserInfo>(
      `${this._BASE_URL}${this._USER}${this._THIS_USER}${this._READ}/${this.id}`
    );
  }

  getAvatars$(): Observable<string[]> {
    return this.http.get<string[]>(`${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ_ALL}/avatar`);
  }

  putUserProfile$(userInfo: UserInfo): Observable<UserInfo> {
    return this.authService.getCurrentUser().pipe(
      switchMap((user: UserToken | null): Observable<UserInfo> => {
        if (user !== null) {
          return this.http.put<UserInfo>(
            `${this._BASE_URL}${this._USER}${this._THIS_USER}${this._UPDATE}/${user.userId}`,
            userInfo
          );
        } else {
          return of({} as UserInfo);
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
