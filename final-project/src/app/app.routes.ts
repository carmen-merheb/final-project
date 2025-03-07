import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { SignupComponent } from './core/auth/components/signup/signup.component';
import { ProductsComponent } from './features/products-listing/components/products/products.component';
import { authGuard } from './core/auth/services/auth.guard';
import { ProductDetailsComponent } from './features/products-listing/components/product-details/product-details.component';
import { HomeComponent } from './features/homepage/home/home.component';
import { CartComponent } from './features/cart/components/cart/cart.component';
import { CartPageComponent } from './features/cart/components/cart-page/cart-page.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }, 
  { path: '**', redirectTo: 'signup' }, 
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [authGuard],
  },

  {
    path: 'products/details/:id',
    component: ProductDetailsComponent,
    canActivate: [authGuard],
  },
  
  {
    path: 'cart', component: CartPageComponent
  },

  { path: '', component: HomeComponent },

];
