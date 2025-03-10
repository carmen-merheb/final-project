import { Component } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts'; // ✅ Import Color & ScaleType

@Component({
  selector: 'app-pie-chart',
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  view: [number, number] = [500, 300]; 

  stockData = [
    { name: 'Out of Stock', value: 5 },
    { name: 'Low Stock', value: 3 },
    { name: 'In Stock', value: 10 }
  ];

  // ✅ Correct colorScheme definition using `Color` type
  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF0000', '#FFD700', '#008000'] // 🔴 Red, 🟡 Yellow, 🟢 Green
  };
}
