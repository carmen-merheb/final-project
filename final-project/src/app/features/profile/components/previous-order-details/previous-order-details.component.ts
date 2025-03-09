import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-previous-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './previous-order-details.component.html',
  styleUrls: ['./previous-order-details.component.scss'],
})
export class PreviousOrderDetailsComponent {
  private orderService = inject(OrdersService);
  private route = inject(ActivatedRoute);
  orderId = this.route.snapshot.paramMap.get('id');
  order = this.orderService.getOrderById(this.orderId);
}
