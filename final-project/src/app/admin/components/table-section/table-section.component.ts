import { Component } from '@angular/core';
import { PRODUCTS } from '../../assets/dummydata';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table-section',
  imports: [CommonModule, RouterModule],
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.scss']
})
export class TableSectionComponent {
  products: Product[] = PRODUCTS;
}
