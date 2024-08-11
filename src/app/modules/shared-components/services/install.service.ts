import { inject, Injectable } from '@angular/core';
import { DeviceService } from './device.service';
import { StorageService } from '../../../core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class InstallService {
  private deviceService = inject(DeviceService);
  private storageService = inject(StorageService);

  pwaIsInstalled(): boolean {
    const isMobile = this.deviceService.isMobileDevice();
    const installed = this.storageService.getItem('installed');
    let result: boolean = true;

    if (isMobile && installed !== true) {
      if (!installed) {
        result = false;
      } else {
        console.log('response', 2);
        this.storageService.setItem('installed', false);
        result = false;
      }
    }
    return result;
  }
}
