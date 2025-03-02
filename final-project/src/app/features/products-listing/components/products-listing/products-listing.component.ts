import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { CardComponent } from '../../../../shared/components/card/card.component';



@Component({
  selector: 'app-products-listing',
  standalone: true,
  templateUrl: './components/products/products.component.html',
  styleUrls: ['./components/products/products.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelect,
    MatOption,
    CardComponent
  ],
})
export class ProductsListingComponent {

}
