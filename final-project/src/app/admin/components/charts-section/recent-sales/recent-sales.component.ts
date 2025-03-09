import { Component } from '@angular/core';
import { SALES_DATA } from '../../../assets/dummydata';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recent-sales',
  imports: [CommonModule, RouterModule],
  templateUrl: './recent-sales.component.html',
  styleUrls: ['./recent-sales.component.scss']
})
export class RecentSalesComponent {
  recentSales = SALES_DATA.sort((a, b) => b.saleDate.getTime() - a.saleDate.getTime()).slice(0, 5);
}
