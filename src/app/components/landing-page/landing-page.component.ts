import { Component, inject, OnInit } from '@angular/core';
import { DeviceService } from '../../modules/shared-components/services/device.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent implements OnInit {
  private deviceService = inject(DeviceService);

  deferredPrompt: any;
  isMobile: boolean = false;

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
    if (this.deviceService.isMobileDevice()) {
      this.isMobile = true;
    }
  }

  installPWA(): void {
    console.log("click");
    
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Installation.');
        } else {
          console.log('not Installable.');
        }
        this.deferredPrompt = null;
      });
    }
  }
}
