import { Injectable, signal } from '@angular/core';
import { IOrder, IUserLog } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders = signal<IUserLog[]>([]); // ✅ Signal for state tracking

  constructor() {
    this.loadOrders(); // ✅ Load orders from storage on init
  }

  placeOrder(userId: number, orderModel: IOrder, finalPrice: number) {
    let prevOrders: IUserLog[] = JSON.parse(localStorage.getItem(`user#${userId} orders`) || '[]');

    const log: IUserLog = {
      order: orderModel,
      orderId: prevOrders.length + 1,
      totalPrice: finalPrice
    };

    prevOrders.push(log);
    localStorage.setItem(`user#${userId} orders`, JSON.stringify(prevOrders));

    this.orders.set(prevOrders); // ✅ Update the signal
    console.log('✅ Order Stored:', prevOrders);
  }

  private loadOrders() {
    const user = this.getCurrentUser();
    if (user) {
      this.orders.set(this.getUserOrders(user.id));
    }
  }

  private getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  getUserOrders(userId: number): IUserLog[] {
    return JSON.parse(localStorage.getItem(`user#${userId} orders`) || '[]');
  }

  getOrderDetails(userId: number, orderId: number): IUserLog | null {
    const orders: IUserLog[] = this.getUserOrders(userId);
    return orders.find(order => order.orderId === orderId) || null;
  }
}
