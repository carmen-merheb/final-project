import { Product } from '../../products-listing/models/products.model';

export interface ICartItem {
  product: Product;
  quantity: number;
  
}
