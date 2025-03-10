import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart.service';
import { FormsModule } from '@angular/forms';
import { IOrder } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { IUser } from '../../../../core/auth/models/user.model';
import { AuthApiService } from '../../../../core/auth/services/auth-api.service';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class CheckoutPaymentComponent {user: IUser | null;
  finalPrice: number = 0;
 

  constructor(private cartService: CartService, private orderService: OrderService, private authApiService: AuthApiService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    this.finalPrice = this.cartService.totalPrice();
    //router: Router;
  }
  selectedPayment: string = 'credit-card';

  paymentMethods = [
    { label: 'Credit/Debit Card', value: 'credit-card', icon: 'fas fa-credit-card' },
    { label: 'PayPal', value: 'paypal', icon: 'fab fa-paypal' },
    { label: 'Apple Pay', value: 'apple', icon: 'fab fa-apple-pay' }
  ];

  checkout() {
    console.log('🔍 Fetching user from API before checkout...');

  this.authApiService.getAuthUser().subscribe({
    next: (user) => {
      console.log('✅ User Retrieved:', user);

    if (!this.cartService.cartItems().length) {
      alert('Your cart is empty!');
      return;
    }

    const orderModel: IOrder = {
      userId: user.id,
      date: new Date(),
      items: this.cartService.cartItems().map(item => ({
        productId: item.product.id,
        productQuantity: item.quantity
      }))
    };

    this.orderService.placeOrder(user.id, orderModel, this.cartService.totalPrice());
    this.cartService.clearCart(); // ✅ Clear cart after order

    alert('Your order has been placed successfully!');
    //this.router.navigate(['/profile/orders']); // ✅ Redirect to previous orders
  },
  error: (error) => {
    console.error('❌ Error fetching user:', error);
    alert('Session expired. Please log in again.');
    this.router.navigate(['/login']); // ✅ Redirect user to login if session expired
  }
});
}

}