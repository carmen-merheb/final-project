import { Component, OnInit } from '@angular/core';
import { AuthState } from '../auth/state/auth.reducers';
import { select, Store } from '@ngrx/store';
//import { CartService } from '../../../features/cart/services/cart.service';
import { isLoggedIn, isLoggedOut } from '../auth/state/auth.selector';
import { Observable } from 'rxjs';
import { logout } from '../auth/state/auth.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  isMenuOpen = false;

  constructor(
    private store: Store<AuthState>,
    //public cart: CartService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  onLogout() {
    this.store.dispatch(logout());
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
