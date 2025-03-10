import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../cart/services/cart.service';
import { ICartItem } from '../../../cart/models/cart.model';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.scss'],
  imports: [CommonModule]
})
export class CheckoutSummaryComponent {
  private cartService = inject(CartService); 
  cartItems = this.cartService.cartItems; 
  totalPrice = computed(() => this.cartService.totalPrice());

  removeItem(item: ICartItem) {
    console.log("Removing item:", item.product.title, "ID:", item.product.id);
    console.log("Cart before removal:", this.cartItems());

    this.cartService.removeItem(item.product.id);
  }
}
