import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { IUserLog } from '../../../cart/models/userLog.model';

import { ProfileService } from '../../services/profile.service';
import { Product } from '../../../products-listing/models/products.model';
import { ProductsApiService } from '../../../products-listing/services/products-api.service';
import { CommonModule } from '@angular/common';
import { forkJoin, map, Observable } from 'rxjs';
import { NewProductsService } from '../../../products-listing/services/new-products.service';

@Component({
  selector: 'app-previous-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './previous-order-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './previous-order-details.component.scss',
})
export class PreviousOrderDetailsComponent implements OnChanges {
  @Input() orderId!: number;
  @Input() userCart!: IUserLog[];
  @Input() userId!: number;
  orderLog!: IUserLog;
  itemList!: {
    productId: number;
    productQuantity: number;
  }[];
  productList$!: Observable<
    {
      productId: number;
      product: Product | { image: string; price: number };
      quantity: number;
    }[]
  >;
  ngOnInit() {
    this.getOrderLog(this.orderId);
    this.itemList = this.orderLog.order.items;
    this.productList$ = this.getProductList(this.itemList);
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.orderId = changes['orderId'].currentValue;
    // this.userCart = changes['userCart'].currentValue;
    // this.userId = changes['userId'].currentValue;
    this.getOrderLog(this.orderId);
    this.itemList = this.orderLog.order.items;
    this.productList$ = this.getProductList(this.itemList);
  }
  constructor(
    public profile: ProfileService,
    public productService: ProductsApiService,
    private i: NewProductsService
  ) {}

  // got {product: id, quantity}
  getOrderLog(index: number) {
    if (this.orderId) this.orderLog = this.userCart[index - 1];
  }

  getProductList(
    itemList: {
      productId: number;
      productQuantity: number;
    }[]
  ): Observable<
    {
      productId: number;
      product: Product | { image: string; price: number };
      quantity: number;
    }[]
  > {
    const productObservables = itemList.map((item) => {
      const productObservable =
        item.productId > 20
          ? this.i.getProductsById(item.productId)
          : this.productService.getProductById(item.productId);

      return productObservable.pipe(
        map((product: Product | undefined) => ({
          productId: item.productId,
          product: product || { image: '', price: 0 },
          quantity: item.productQuantity,
        }))
      );
    });

    return forkJoin(productObservables);
  }
}
