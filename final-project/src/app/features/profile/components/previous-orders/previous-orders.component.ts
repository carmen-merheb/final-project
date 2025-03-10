import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../checkout/services/order.service';
import { AuthApiService } from '../../../../core/auth/services/auth-api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IUserLog } from '../../../cart/models/userLog.model';

@Component({
  selector: 'app-previous-orders',
  imports: [CommonModule, RouterModule],
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.scss']
})
export class PreviousOrdersComponent implements OnInit {
  orders: IUserLog[] = [];
  userId: number | null = null;
  expandedOrderId: number | null = null;

  constructor(private orderService: OrderService, private authApiService: AuthApiService) {}

  ngOnInit() {
    console.log('Fetching user before loading orders...');
    this.authApiService.getAuthUser().subscribe({
      next: (user) => {
        console.log('User Retrieved:', user);
        this.userId = user.id;

        this.orders = this.orderService.getUserOrders(this.userId);
        console.log('Retrieved Orders:', this.orders);
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        alert('Session expired. Please log in again.');
      }
    });
  }
  toggleOrderDetails(orderId: number) {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId; 
  }
}
