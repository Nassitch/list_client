import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { ToastService } from '../../modules/shared-components/services/toast.service';
import { TokenDecrypted } from '../../models/token-decrypted.interface';

export const adminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const decodedToken: TokenDecrypted = tokenService.getTokenFromCookiesAndDecode();
  
  if (decodedToken.role === 'ROLE_USER') {
    router.navigate(['/home']);
    toastService.error("Vos droits ne sont pas suffisant pour accéder au tableau de bord.");
  } else if (!decodedToken || decodedToken.role !== 'ROLE_ADMIN') {
    router.navigate(['/login']);
    toastService.error("Vous n'êtes pas autorisé à accéder à cette page.");
    return false;
  }
  return true;
};
