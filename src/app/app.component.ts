import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader: boolean = true;
  private routerSubscription?: Subscription;

  private router = inject(Router);

  ngOnInit(): void {
        this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showHeader = !['/login', '/signup', '/register', '/landing-page'].includes(
          event.urlAfterRedirects
        );
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

}
