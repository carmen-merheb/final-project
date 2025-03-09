import { Component } from '@angular/core';
import { LoginComponent } from './core/auth/components/login/login.component';
import { SignupComponent } from './core/auth/components/signup/signup.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/footer/footer.component';
import { NavComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './features/homepage/home/home.component';
import { CategoriesComponent } from './features/homepage/categories/categories.component';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './features/cart/components/cart-page/cart-page.component';
import { CartComponent } from './features/cart/components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SignupComponent, RouterOutlet, FooterComponent, NavComponent, HomeComponent, CategoriesComponent, CartPageComponent, CartComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'final-project';
}
