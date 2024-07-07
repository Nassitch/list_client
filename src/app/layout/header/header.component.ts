import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../../core/services/token.service';
import { AuthService } from '../../modules/auth/shared/services/auth.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { UserToken } from '../../models/user-token.interface';
import { environment } from '../../../environments/environment.developpment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUserSubscription!: Subscription;
  private _BASE_URL: string = environment._BASE_URL;
  private _PUBLIC: string = environment._PUBLIC;
  private _UPLOAD: string = environment._UPLOAD;
  private _READ: string = environment._READ;
  profile: string = '../../../assets/icons/default-person.svg';

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.getCurrentUser().subscribe(user => {
      console.log("Picture :", user);
      if (user && user.picture) {
        const getImage = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}/avatar/`
        this.profile = getImage + user.picture;
      }
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
