import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { environment } from '../../../../../environments/environment.developpment';
import { UserInfo } from '../../models/user-info.interface';
import { AuthService } from '../../../auth/shared/services/auth.service';
import { UserToken } from '../../../../models/user-token.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  protected id!: number;
  private currentUserSubscription: Subscription | null = null;

  private _BASE_URL: string = environment._BASE_URL;
  private _PUBLIC: string = environment._PUBLIC;
  private _USER: string = environment._USER;
  private _UPLOAD: string = environment._UPLOAD;
  private _THIS_USER: string = environment._THIS_USER;
  private _READ: string = environment._READ;
  private _READ_ALL: string = environment._READ_ALL;
  private _UPDATE: string = environment._UPDATE;

  ngOnInit(): void {
    this.currentUserSubscription = this.authService
      .getCurrentUser()
      .subscribe((user) => {
        if (user) {
          this.id = user.userId;
        }
      });
  }

  getUserProfile$(): Observable<UserInfo> {
    return this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        if (user !== null) {
          return this.http.get<UserInfo>(`${this._BASE_URL}${this._USER}${this._THIS_USER}${this._READ}/${user.userId}`);
        } else {
          throw new Error('User ID is not defined.');
        }
      })
    );
  }
  
  getAvatars$(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ_ALL}/avatar`
    );
  }
  
  putUserProfile$(userInfo: UserInfo): Observable<UserInfo> {
    return this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        if (user !== null) {
          return this.http.put<UserInfo>(`${this._BASE_URL}${this._USER}${this._THIS_USER}${this._UPDATE}/${user.userId}`, userInfo);
        } else {
          throw new Error('User ID is not defined.');
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
