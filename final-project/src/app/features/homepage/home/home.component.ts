import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';
import { NewProductsComponent } from '../new-products/new-products.component';
import { NavComponent } from '../../../core/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CategoriesComponent, NewProductsComponent, NavComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  onDiscoverNow() {
    this.router.navigate(['/products']);
  }
}
