import { Component } from '@angular/core';
import { PRODUCTS } from '../../../assets/dummydata';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pie-chart',
  imports: [NgxChartsModule,CommonModule, RouterOutlet],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  view: [number, number] = [400, 300];

  stockData = [
    { name: 'In Stock', value: PRODUCTS.filter(p => p.status === 'In Stock').length },
    { name: 'Low Stock', value: PRODUCTS.filter(p => p.status === 'Low Stock').length },
    { name: 'Out of Stock', value: PRODUCTS.filter(p => p.status === 'Out of Stock').length }
  ];

  colorScheme = 'vivid';
}
