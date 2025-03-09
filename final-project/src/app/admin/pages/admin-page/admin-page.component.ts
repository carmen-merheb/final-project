import { Component } from '@angular/core';
import { TableSectionComponent } from '../../components/table-section/table-section.component';
import { ChartsPageComponent } from '../../components/charts-section/charts-page/charts-page.component';

@Component({
  selector: 'app-admin-page',
  imports: [TableSectionComponent, ChartsPageComponent],
  standalone: true,
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {

}
