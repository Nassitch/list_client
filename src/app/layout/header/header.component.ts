import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.developpment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUserSubscription!: Subscription;
  private authService = inject(AuthService);
  private router = inject(Router);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _PUBLIC: string = environment._PUBLIC;
  private readonly _UPLOAD: string = environment._UPLOAD;
  private readonly _READ: string = environment._READ;
  private readonly _AVATAR: string = environment._AVATAR;
  protected profile: string = '../../../assets/icons/default-person.svg';
  protected isSettingWindowActive: boolean = false;

  ngOnInit(): void {
    this.currentUserSubscription = this.authService
      .getCurrentUser()
      .subscribe((user) => {
        console.log('Picture :', user);
        if (user && user.picture) {
          const getImage = `${this._BASE_URL}${this._PUBLIC}${this._UPLOAD}${this._READ}${this._AVATAR}`;
          this.profile = getImage + user.picture;
        }
      });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  toggleSettingWindow(): boolean {
    return this.isSettingWindowActive = !this.isSettingWindowActive;
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
