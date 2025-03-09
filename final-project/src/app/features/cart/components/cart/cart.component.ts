import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { ICartItem } from '../../models/cart.model';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormField, MatDivider, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})


export class CartComponent {
  finalPrice: number;
  showTotal: boolean = false;

  constructor(public cartService: CartService) {
    this.finalPrice = this.cartService.totalPrice(); 
  }

  onInputQuantity(i: number, input: number) {
    console.log('input: ', input);
    if (input === 0) {
      this.cartService.removeItem(i);
    } else {
      this.cartService.checkStock(i);
    }
  }

  onRemove(i: number) {
    this.cartService.removeItem(i);
  }

  onClear() {
    this.cartService.clearCart();
  }

  onOrder() {
    if (this.cartService.countItems() == 0) {
      alert(`Please add items to your cart!`);
    } else {
      this.cartService.placeOrder(this.finalPrice);
      this.finalPrice = 0;
    }
  }

  onDec(i: number) {
    this.cartService.decQuantity(i);
  }

  onInc(i: number) {
    this.cartService.incQuantity(i);
  }
}

