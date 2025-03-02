import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/products.model';
import { CartService } from '../../../cart/services/cart.service';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-card',
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss',
})
export class ProductsCardComponent {
  @Input() productData!: Product;

  constructor(
    private cartService: CartService
  ) {}

  add() {
    this.cartService.addProduct(this.productData);
  }
}
