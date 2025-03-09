import { Component, OnInit } from '@angular/core';
import { AuthState } from '../auth/state/auth.reducers';
import { select, Store } from '@ngrx/store';
import { isLoggedIn, isLoggedOut } from '../auth/state/auth.selector';
import { filter, Observable } from 'rxjs';
import { logout } from '../auth/state/auth.actions';
import { CommonModule } from '@angular/common';
import { CartService } from '../../features/cart/services/cart.service';
import { CartPageComponent } from '../../features/cart/components/cart-page/cart-page.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/login.service';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, CartPageComponent, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  menuOpen = false;
  currentRoute: string = '';

  constructor(
    private store: Store<AuthState>,
    public cart: CartService,
    private authService: AuthService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  onLogout() {
    this.store.dispatch(logout());
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  handleLogout() {
    this.authService.logout();
  }
}
