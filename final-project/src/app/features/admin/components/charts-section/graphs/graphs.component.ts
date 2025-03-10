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
  view: [number, number] = [600, 400]; // ✅ Adjust chart size for better legend spacing

  legendOptions = {
    position: 'right', // ✅ Moves the legend to the right for better space
    title: 'Products', // ✅ Adds a title for clarity
    width: 150 // ✅ Increases legend width to prevent text cutoff
  };

  salesData = SALES_DATA.map(sale => ({
    name: sale.productName,
    value: sale.totalRevenue
  }));

  colorScheme = 'cool';  
}
