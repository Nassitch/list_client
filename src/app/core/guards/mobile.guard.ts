import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DeviceService } from '../../modules/shared-components/services/device.service';

export const mobileGuard: CanActivateFn = (route, state) => {
  
  const deviceService = inject(DeviceService);
  const router = inject(Router);

  if (deviceService.isMobileDevice()) {
    return true;
  } else {
    router.navigate(['/landing-page']);
    return false;
  }
};
