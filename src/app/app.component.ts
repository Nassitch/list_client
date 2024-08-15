import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { StorageService } from './core/services/storage.service';
import { DeviceService } from './modules/shared-components/services/device.service';
import { InstallService } from './modules/shared-components/services/install.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader: boolean = true;
  showInstallWindow: boolean = false;
  private routerSubscription?: Subscription;

  private router = inject(Router);
  private installService = inject(InstallService);

  ngOnInit(): void {
        this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showHeader = !['/login', '/signup', '/register', '/landing-page'].includes(
          event.urlAfterRedirects
        );
      });
      const installed = this.installService.pwaIsInstalled();
      console.log(installed);
      console.log("before logg !");
      if (installed !== true) {
        console.log("logg !");
        this.showInstallWindow = true;
      }
  }

  closeInstallWindow(event: boolean) {
    this.showInstallWindow = event;
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

}
