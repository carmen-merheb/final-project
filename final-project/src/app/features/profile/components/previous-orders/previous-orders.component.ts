import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-previous-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.scss'],
})
export class PreviousOrdersComponent {
  private orderService = inject(OrdersService);
  orders = this.orderService.getOrders();
}
