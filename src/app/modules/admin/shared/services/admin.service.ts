import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TokenService } from '../../../../core/services/token.service';
import { UserToken } from '../../../../models/user-token.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public currentUserRole$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  private tokenService = inject(TokenService);


  initializeUserRole(): void {
    const decodedToken: UserToken = this.tokenService.getTokenFromCookiesAndDecode();
    if (decodedToken) {
      this.currentUserRole$.next(decodedToken.role);
    } else {
      this.currentUserRole$.next(undefined);
    }
  }
}
