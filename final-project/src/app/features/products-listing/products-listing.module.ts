import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { MatOption, MatSelect } from '@angular/material/select';

@NgModule({
  declarations: [
    ProductsCardComponent,
    ProductsComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    CardComponent,
    MatSelect,
    MatOption,
  ],
  exports: [ProductsCardComponent, ProductsComponent],
})
export class ProductListingModule {}
