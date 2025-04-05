import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platform_id = inject(PLATFORM_ID);
  
  if (isPlatformBrowser(platform_id)) {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};