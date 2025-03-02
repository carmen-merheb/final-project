import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../features/products-listing/models/products.model';
import { CartService } from '../../../features/cart/services/cart.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterModule],
})
export class CardComponent {
  @Input() productData!: Product;

  @Output() newId = new EventEmitter<number>();

  sendData() {
   this.newId.emit(this.productData.id);
  }

  constructor(
    private cartService: CartService
  ) {}

  addItem() {
    this.cartService.addProduct(this.productData);
  }

}
