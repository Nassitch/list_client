import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { TokenDecrypted } from '../../models/token-decrypted.interface';
import { ToastService } from '../../modules/shared-components/services/toast.service';

export const userGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const decodedToken: TokenDecrypted = tokenService.getTokenFromCookiesAndDecode();
  
  if (decodedToken.role === 'ROLE_ADMIN') {
    router.navigate(['/admin/dash-board']);
    toastService.error("Seul les utilisateurs ont accés à cette page.");
  } else if (!decodedToken || decodedToken.role !== 'ROLE_USER') {
    router.navigate(['/login']);
    toastService.error("Vous n'êtes pas autorisé à accéder à cette page.");
    return false;
  }
  return true;
};
