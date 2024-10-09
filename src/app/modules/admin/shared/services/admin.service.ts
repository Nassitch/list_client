import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../../../../core/services/token.service';
import { environment } from '../../../../../environments/environment.developpment';
import { UserInfo } from '../../../user/models/user-info.interface';
import { HttpClient } from '@angular/common/http';
import { DeleteMsg } from '../../../shared-components/models/delete-msg.interface';
import {TokenDecrypted} from "../../../../models/token-decrypted.interface";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public currentUserRole$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  private http: HttpClient = inject(HttpClient);
  private tokenService: TokenService = inject(TokenService);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _USER: string = environment._USER;
  private readonly _THIS_USER: string = environment._THIS_USER;
  private readonly _READ: string = environment._READ;
  private readonly _UPDATE: string = environment._UPDATE;
  private readonly _DELETE: string = environment._DELETE;

  initializeUserRole(): void {
    const decodedToken: TokenDecrypted | null = this.tokenService.getTokenFromCookiesAndDecode();
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
