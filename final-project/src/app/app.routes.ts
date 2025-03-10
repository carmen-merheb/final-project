import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { SignupComponent } from './core/auth/components/signup/signup.component';
import { ProductsComponent } from './features/products-listing/components/products/products.component';
import { ProductDetailsComponent } from './features/products-listing/components/product-details/product-details.component';
import { HomeComponent } from './features/homepage/home/home.component';
import { CartComponent } from './features/cart/components/cart/cart.component';
import { CartPageComponent } from './features/cart/components/cart-page/cart-page.component';
import { CheckoutPageComponent } from './features/checkout/pages/checkout-page/checkout-page.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/auth/services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' , canActivate: [AuthGuard]   },

  { path: 'login', component: LoginComponent,  pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },

  { path: 'products', component: ProductsComponent, pathMatch: 'full' , canActivate: [AuthGuard]  },
  { path: 'products/details/:id', component: ProductDetailsComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
  { path: 'cart', component: CartPageComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, pathMatch: 'full' , canActivate: [AuthGuard] },

  {
    path: 'profile',
    loadChildren: () =>
      import('./features/profile/profile-routing.module').then(
        (m) => m.ProfileRoutingModule 
      ), canActivate: [AuthGuard] 
  },

  { 
    path: 'admin', 
    loadChildren: () => import('./features/admin/admin-routing.module').then(m => m.AdminRoutingModule) , canActivate: [AuthGuard] 
  },

  { path: 'checkout', component: CheckoutPageComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


