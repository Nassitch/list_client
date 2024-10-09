import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DeviceService } from '../../modules/shared-components/services/device.service';

export const mobileGuard: CanActivateFn = () => {
  const deviceService: DeviceService = inject(DeviceService);
  const router: Router = inject(Router);

  if (deviceService.isMobileDevice()) {
    return true;
  } else {
    router.navigate(['/landing-page']);
    return false;
  }
};
