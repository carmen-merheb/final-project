import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { SignupComponent } from './core/auth/components/signup/signup.component';
import { ProductsComponent } from './features/products-listing/components/products/products.component';
import { authGuard } from './core/auth/services/auth.guard';
import { ProductDetailsComponent } from './features/products-listing/components/product-details/product-details.component';
import { HomeComponent } from './features/homepage/home/home.component';
import { CartComponent } from './features/cart/components/cart/cart.component';
import { CartPageComponent } from './features/cart/components/cart-page/cart-page.component';
import { CheckoutPageComponent } from './features/checkout/pages/checkout-page/checkout-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [authGuard], pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, canActivate: [authGuard], pathMatch: 'full' },

  { path: 'products', component: ProductsComponent, pathMatch: 'full' },
  { path: 'products/details/:id', component: ProductDetailsComponent, pathMatch: 'full' },
  { path: 'cart', component: CartPageComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },

  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile-routing.module').then(
        (m) => m.ProfileRoutingModule
      ),
  },

  { 
    path: 'admin', 
    loadChildren: () => import('./features/admin/admin-routing.module').then(m => m.AdminRoutingModule) 
  },

  { path: 'checkout', component: CheckoutPageComponent, pathMatch: 'full' },
];

  

