import { Component } from '@angular/core';
import { SALES_DATA } from '../../../assets/dummydata';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-graphs',
  imports: [NgxChartsModule, CommonModule, RouterModule],
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent {
  view: [number, number] = [500, 300];

  salesData = SALES_DATA.map(sale => ({
    name: sale.productName,
    value: sale.totalRevenue
  }));

  colorScheme = 'cool';  
}
