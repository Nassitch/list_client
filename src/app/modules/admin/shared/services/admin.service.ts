import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TokenService } from '../../../../core/services/token.service';
import { UserToken } from '../../../../models/user-token.interface';
import { environment } from '../../../../../environments/environment.developpment';
import { UserInfo } from '../../../user/models/user-info.interface';
import { HttpClient } from '@angular/common/http';
import { DeleteMsg } from '../../../shared-components/models/delete-msg.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public currentUserRole$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);

  private _BASE_URL: string = environment._BASE_URL;
  private _USER: string = environment._USER;
  private _THIS_USER: string = environment._THIS_USER;
  private _READ: string = environment._READ;
  private _UPDATE: string = environment._UPDATE;
  private _DELETE: string = environment._DELETE;

  initializeUserRole(): void {
    const decodedToken: UserToken = this.tokenService.getTokenFromCookiesAndDecode();
    if (decodedToken) {
      this.currentUserRole$.next(decodedToken.role);
    } else {
      this.currentUserRole$.next(undefined);
    }
  }

  getUserProfileById$(id: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this._BASE_URL}${this._USER}${this._THIS_USER}${this._READ}/${id}`)
  }

  editUserProfile$(id: number, userInfo: UserInfo): Observable<UserInfo> {
    return this.http.put<UserInfo>(`${this._BASE_URL}${this._USER}${this._THIS_USER}${this._UPDATE}/${id}`, userInfo);
  }

  deleteUser$(id: number): Observable<DeleteMsg> {
    return this.http.delete<DeleteMsg>(`${this._BASE_URL}${this._USER}${this._THIS_USER}${this._DELETE}/${id}`);
  }
}
