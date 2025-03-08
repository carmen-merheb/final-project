import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsApiService } from '../../services/products-api.service';
import { Product } from '../../models/products.model';
import { CartService } from '../../../cart/services/cart.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../../../shared/card/card/card.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { NewProductsService } from '../../services/new-products.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, MatIconModule, CardComponent, MatDividerModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  similarProducts$!: Observable<Product[]>;
  id!: any;
  product!: Product;
  stars!: number[];
  remaining!: number[];
  isHalf: boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private productsService: ProductsApiService,
    private cartService: CartService,
    private i: NewProductsService,
    private categoryService: CategoriesService,
    private router: Router
  ) {}
  displayNewItem(id: number) {
    this.router.navigate(['/products/details', id]);

    this.id = id;
    this.getSimilar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.getSimilar();
  }

  getSimilar() {
      this.similarProducts$ = this.productsService.getProductById(this.id).pipe(
        tap((product) => {
          this.product = product;
          this.getRating(this.product.rating.rate);
        }),
        switchMap((product) =>
          this.categoryService
            .getProductsByCategory(product.category)
            .pipe(
              map((products) =>
                products.filter((p) => p.id !== this.product.id)
              )
            )
        )
      );
    
  }

  getNewProduct() {
    this.i.getProductsById(Number(this.id)).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.getRating(this.product.rating.rate);
          // console.log('Found product:', product);

          this.similarProducts$ = this.i
            .getNewItems()
            .pipe(
              map((products) =>
                products.filter((p) => p.id !== this.product.id)
              )
            );
        } else {
          console.log('Product not found.');
        }
      },
    });
  }


  getRating(rating: number) {
    if (rating % 1 !== 0) {
      this.isHalf = true;
    }
    this.stars = Array.from({ length: Math.floor(rating) }, (_, i) => i + 1);
    if (this.isHalf) {
      this.remaining = Array.from(
        { length: 4 - Math.floor(rating) },
        (_, i) => i + 1
      );
    } else {
      this.remaining = Array.from(
        { length: 5 - Math.floor(rating) },
        (_, i) => i + 1
      );
    }
  }
  add() {
    this.cartService.addProduct(this.product);
  }
}
