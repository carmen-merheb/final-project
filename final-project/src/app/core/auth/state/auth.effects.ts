import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
//import { CartService } from '../../../features/cart/services/cart.service';


@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private router: Router,
    //private cartItems: CartService,
    private store: Store
  ) {}
  currentUser!: number;
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => {
          localStorage.setItem(
            'user',
            JSON.stringify({
              email: action.email,
              token: action.token,
              userId: action.userId,
            })
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),

        tap((action) => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        })
      ),
    { dispatch: false }
  );
}