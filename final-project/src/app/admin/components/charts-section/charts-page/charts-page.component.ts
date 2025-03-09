import { Component } from '@angular/core';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { GraphsComponent } from '../graphs/graphs.component';
import { RecentSalesComponent } from '../recent-sales/recent-sales.component';

@Component({
  selector: 'app-charts-page',
  imports: [PieChartComponent, GraphsComponent, RecentSalesComponent],
  standalone: true,
  templateUrl: './charts-page.component.html',
  styleUrl: './charts-page.component.scss'
})
export class ChartsPageComponent {

}
