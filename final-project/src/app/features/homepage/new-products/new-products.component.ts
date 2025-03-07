import { Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { Product } from '../../products-listing/models/products.model';
import { NewProductsService } from '../../products-listing/services/new-products.service';

@Component({
  selector: 'app-new-products',
  imports: [CardComponent],
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.scss'
})
export class NewProductsComponent {
  newItems!: Product[];
  constructor(private i: NewProductsService) {
    this.i.getNewItems().subscribe((products: Product[]) => {
      this.newItems = products;
    });
  }

}
