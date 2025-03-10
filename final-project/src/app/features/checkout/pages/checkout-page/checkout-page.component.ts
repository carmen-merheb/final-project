import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutSummaryComponent } from '../../components/checkout-summary/checkout-summary.component';
import { CheckoutFormComponent } from '../../components/checkout-form/checkout-form.component';
import { CheckoutPaymentComponent } from '../../components/checkout-payment/checkout-payment.component';
import { CartService } from '../../../cart/services/cart.service';
import { IUser } from '../../../../core/auth/models/user.model';
import { OrderService } from '../../services/order.service';
import { IOrder } from '../../models/order.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
  imports: [CommonModule, CheckoutSummaryComponent, CheckoutFormComponent, CheckoutPaymentComponent, RouterModule]
})
export class CheckoutPageComponent {  user: IUser | null;
  finalPrice: number = 0;

  constructor(private cartService: CartService, private orderService: OrderService) {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    this.finalPrice = this.cartService.totalPrice();
  }

  checkout() {
    if (!this.user) {
      alert('Please log in to place an order.');
      return;
    }

    if (!this.cartService.cartItems().length) {
      alert('Your cart is empty!');
      return;
    }

    const orderModel: IOrder = {
      userId: this.user.id,
      date: new Date(),
      items: this.cartService.cartItems().map(item => ({
        productId: item.product.id,
        productQuantity: item.quantity
      }))
    };

    this.orderService.placeOrder(this.user.id, orderModel, this.finalPrice);
    this.cartService.clearCart(); 

    alert('Your order has been placed successfully!');
  }
}
