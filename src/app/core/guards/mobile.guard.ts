import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DeviceService } from '../../modules/shared-components/services/device.service';
import { StorageService } from '../services/storage.service';

export const mobileGuard: CanActivateFn = (route, state) => {
  const deviceService = inject(DeviceService);
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (deviceService.isMobileDevice()) {
    // if (storageService.getItem('installed')) {
    //   return true;
    // } else {
    //   storageService.setItem('installed', false);
    //   router.navigate(['/landing-page']);
    //   return false;
    // }
    return true;
  } else {
    router.navigate(['/landing-page']);
    return false;
  }
};
