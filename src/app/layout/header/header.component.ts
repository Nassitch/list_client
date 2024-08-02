import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.developpment';
import { Router } from '@angular/router';
import { ImageService } from '../../modules/shared-components/services/image.service';
import { UserService } from '../../modules/user/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  currentUserSubscription!: Subscription;
  profileSubscription!: Subscription;

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public imageService = inject(ImageService);

  protected profile: string = '../../../assets/icons/default-person.svg';
  protected isSettingWindowActive: boolean = false;

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.getCurrentUser()
      .subscribe((user) => {
        if (user && user.picture) {
          const getImage = this.imageService._BASE_URL_USER_IMG;
          this.profile = getImage + user.picture;
        }
      });

    this.profileSubscription = this.userService.profile$.subscribe((profile) => {
      if (profile && profile.picture) {
        const getImage = this.imageService._BASE_URL_USER_IMG;
        this.profile = getImage + profile.picture;
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
