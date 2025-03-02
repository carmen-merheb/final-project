import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductsApiService } from '../../services/products-api.service';
import { CategoriesService } from '../../services/categories.service';
import { SortService } from '../../services/sort.service';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, MatLabel, MatIconModule, MatFormField, MatSelect, MatOptionModule, CardComponent, ProductsCardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  originalProductList: Product[] = [];
  productList!: Product[];
  searchlist!: Product[];
  searchValue = '';
  categories!: string[];
  currentCategory = 'All';
  sortOptions: string[] = [
    'Ascending',
    'Descending',
    'Price Ascending',
    'Price Descending',
    'Rate Ascending',
    'Rate Descending',
  ];
  currentSort = 'Default';

  constructor(
    private productsService: ProductsApiService,
    private cat: CategoriesService,
    private sortService: SortService,
    private http: HttpClient,
  ) {}



  onCategoryChange(value: string) {
    if (value === 'All') {
      if (this.searchValue === '') this.productList = this.originalProductList;
      else {
        this.productList = this.originalProductList.filter((product) =>
          product.title.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      }
      this.sortService.sort(this.currentSort, this.productList);

      this.searchlist = [...this.originalProductList];
  
    } else {
      let productsByCategory: Product[];
      this.cat.getProductsByCategory(value).subscribe((res: Product[]) => {
        productsByCategory = res;
        this.productList = productsByCategory.filter((product) =>
          product.title.toLowerCase().includes(this.searchValue.toLowerCase())
        );
        this.sortService.sort(this.currentSort, this.productList);
        this.searchlist = [...productsByCategory];

        this.currentCategory = value;
      });
    }
  }

  onSortChange(value: string) {
    this.currentSort = value;

    this.sortService.sort(this.currentSort, this.productList);
    this.searchlist = [...this.productList];
  }

  onSearch() {
    if (this.searchValue !== '') {
      this.productList = this.searchlist.filter((product) =>
        product.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      this.productList = this.searchlist;
    }
  }

  onClear() {
    this.searchValue = '';
    this.productList = this.searchlist;
  }
}
