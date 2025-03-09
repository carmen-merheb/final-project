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
import { CardComponent } from '../../../../shared/card/card/card.component';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { FormsModule } from '@angular/forms';
import { NewProductsService } from '../../services/new-products.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatLabel,
    MatIconModule,
    MatFormField,
    MatSelect,
    MatOptionModule,
    CardComponent,
    ProductsCardComponent,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  originalProductList: Product[] = [];
  productList!: Product[];
  categorizedProducts: { [category: string]: Product[] } = {}; // ✅ Grouped product sections
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
    private i: NewProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("🟢 ProductsComponent initialized");
  
    forkJoin([
      this.productsService.getAllProducts(),
      this.i.getNewItems(),
    ]).subscribe({
      next: ([apiProducts, mockProducts]: [Product[], Product[]]) => {
        this.originalProductList = [...mockProducts, ...apiProducts];
        this.productList = [...this.originalProductList];
  
        console.log("✅ Loaded originalProductList:", this.originalProductList.length);
  
        this.route.queryParams.subscribe(params => {
          let category = params['category'];
  
          if (category) {
            console.log(`🟢 Category from query params: ${category}`);
            this.currentCategory = category;
  
            // ✅ Call onCategoryChange with category string instead of event
            this.onCategoryChange({ target: { value: category } } as any);
          }
          else {this.onCategoryChange({ target: { value: 'All' } } as any);}
        });
  
        this.displayCategories(); // ✅ Ensure category dropdown is populated
      },
      error: (err: any) => {
        console.error("❌ Error fetching all products:", err.message);
      }
    });
  }
  
  
  displayCategories() {
    this.cat.getAllCategories().subscribe({
      next: (categories: string[]) => {
        const newCategory = 'Knittings';
        this.categories = ['All', ...categories, newCategory];
      },
      error: (err: any) => {
        alert(err.message);
      },
    });
  }

  // ✅ Group products by category for sectioned display
  groupProductsByCategory() {
    this.categorizedProducts = this.productList.reduce((acc, product) => {
      const category = product.category.trim();
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as { [category: string]: Product[] });

    console.log("✅ Updated Categorized Products:", this.categorizedProducts);
  }

  onCategoryChange(event: any) {
    const value = event.target.value;
    console.log(`🟢 onCategoryChange called with value: ${value}`);
  
    this.currentCategory = value;
  
    if (value === 'All' || !value) {
      console.log("🟢 Showing all products");
      this.productList = [...this.originalProductList]; // ✅ Show all products
      this.applySorting();
      this.groupProductsByCategory();
    } else if (value === 'Knittings') {
      this.i.getNewItems().subscribe({
        next: (products: Product[]) => {
          this.productList = products.filter(product =>
            product.title.toLowerCase().includes(this.searchValue.toLowerCase())
          );
          this.applySorting();
          this.groupProductsByCategory();
        },
        error: (err: any) => {
          console.error("❌ Error fetching Knittings category:", err.message);
        }
      });
    } else {
      this.cat.getProductsByCategory(value).subscribe({
        next: (productsByCategory: Product[]) => {
          this.productList = productsByCategory.filter(product =>
            product.title.toLowerCase().includes(this.searchValue.toLowerCase())
          );
          this.applySorting();
          this.groupProductsByCategory();
        },
        error: (err: any) => {
          console.error(`❌ Error fetching category ${value}:`, err.message);
        }
      });
    }
  }
  
  

  // ✅ Sorting Method (Sorts AND Updates Categorized Products)
  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.currentSort = value;
    this.applySorting();
    this.groupProductsByCategory();
  }

  // ✅ Apply Sorting Based on Selection
  applySorting() {
    this.sortService.sort(this.currentSort, this.productList);
    this.searchlist = [...this.productList]; // ✅ Keep searchlist updated
  }

  // ✅ Apply Search Filter
  onSearch() {
    if (this.searchValue !== '') {
      this.productList = this.searchlist.filter((product) =>
        product.title.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    } else {
      this.productList = [...this.searchlist];
    }

    this.applySorting();
    this.groupProductsByCategory();
  }

  // ✅ Clear Search & Reset Products
  onClear() {
    this.searchValue = '';
    this.productList = [...this.searchlist];
    this.applySorting();
    this.groupProductsByCategory();
  }
}
