import { Injectable, signal } from '@angular/core';

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  date: string;
  total: number;
  items: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders = signal<Order[]>([
    {
      id: 101,
      date: '2024-04-01',
      total: 150.99,
      items: [
        { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: 2, name: 'USB-C Charger', price: 29.99, quantity: 2 },
      ]
    },
    {
      id: 101,
      date: '2024-04-01',
      total: 150.99,
      items: [
        { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: 2, name: 'USB-C Charger', price: 29.99, quantity: 2 },
      ]
    },
    {
      id: 101,
      date: '2024-04-01',
      total: 150.99,
      items: [
        { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: 2, name: 'USB-C Charger', price: 29.99, quantity: 2 },
      ]
    },
    {
      id: 101,
      date: '2024-04-01',
      total: 150.99,
      items: [
        { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: 2, name: 'USB-C Charger', price: 29.99, quantity: 2 },
      ]
    },
    {
      id: 101,
      date: '2024-04-01',
      total: 150.99,
      items: [
        { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: 2, name: 'USB-C Charger', price: 29.99, quantity: 2 },
      ]
    },
    {
      id: 101,
      date: '2024-04-01',
      total: 150.99,
      items: [
        { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: 2, name: 'USB-C Charger', price: 29.99, quantity: 2 },
      ]
    },
    {
      id: 101,
      date: '2024-04-01',
      total: 150.99,
      items: [
        { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: 2, name: 'USB-C Charger', price: 29.99, quantity: 2 },
      ]
    },
    {
      id: 101,
      date: '2024-04-01',
      total: 150.99,
      items: [
        { id: 1, name: 'Wireless Headphones', price: 79.99, quantity: 1 },
        { id: 2, name: 'USB-C Charger', price: 29.99, quantity: 2 },
      ]
    },
    {
      id: 102,
      date: '2024-03-25',
      total: 299.49,
      items: [
        { id: 3, name: 'Smartphone', price: 299.49, quantity: 1 },
      ]
    },
    {
      id: 102,
      date: '2024-03-25',
      total: 299.49,
      items: [
        { id: 3, name: 'Smartphone', price: 299.49, quantity: 1 },
      ]
    },
    {
      id: 102,
      date: '2024-03-25',
      total: 299.49,
      items: [
        { id: 3, name: 'Smartphone', price: 299.49, quantity: 1 },
      ]
    },
    {
      id: 102,
      date: '2024-03-25',
      total: 299.49,
      items: [
        { id: 3, name: 'Smartphone', price: 299.49, quantity: 1 },
      ]
    },
    {
      id: 102,
      date: '2024-03-25',
      total: 299.49,
      items: [
        { id: 3, name: 'Smartphone', price: 299.49, quantity: 1 },
      ]
    },
  ]);

  /** ✅ Fetch all orders */
  getOrders(): Order[] {
    return this.orders();
  }

  /** ✅ Fetch order by ID */
  getOrderById(orderId: number | string | null): Order | undefined {
    return this.orders().find(order => order.id === Number(orderId));
  }

  /** ✅ Add a new order */
  addOrder(newOrder: Order) {
    this.orders.update(orders => [...orders, newOrder]);
  }
}
