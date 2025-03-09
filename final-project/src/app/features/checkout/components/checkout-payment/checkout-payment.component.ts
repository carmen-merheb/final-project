import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CheckoutPaymentComponent {
  constructor(private cartService: CartService, private router: Router) {}
  selectedPayment: string = 'credit-card';

  paymentMethods = [
    { label: 'Credit/Debit Card', value: 'credit-card', icon: 'fas fa-credit-card' },
    { label: 'PayPal', value: 'paypal', icon: 'fab fa-paypal' },
    { label: 'Apple Pay', value: 'apple', icon: 'fab fa-apple-pay' }
  ];

  onSubmitOrder() {
    console.log("✅ Order submitted!");
    this.cartService.clearCart();
    this.router.navigate(['/order-success']);
  }
}
