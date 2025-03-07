import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './login.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
    tap(canActivate => {
      if (!canActivate) {
        console.warn('Access denied - User is already logged in');
      }
    })
  );
};
