import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../modules/user/shared/services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {

  private userService = inject(UserService);
  private router = inject(Router);

  profile$!: Observable<any>;

  landingMsg: boolean = true;

  ngOnInit(): void {
    this.userService.initialize();
    this.profile$ = this.userService.getUserProfile$();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  closeLandingMsg(): boolean {
    return this.landingMsg = !this.landingMsg;
  }

}
