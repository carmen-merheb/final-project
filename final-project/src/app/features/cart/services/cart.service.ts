import { computed, effect, Injectable, signal } from '@angular/core';
import { ICartItem } from '../models/cart.model';
import { Product } from '../../products-listing/models/products.model';
import { IOrder } from '../models/order.model';
import { IUserLog } from '../models/userLog.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems.set(JSON.parse(storedCart));
    }

    effect(() => {
      const cartState = this.cartItems();
      localStorage.setItem('cart', JSON.stringify(cartState));
    });
  }

  public ordered: boolean = false;
  public orderCount!: number;

  public cartItems = signal<ICartItem[]>([]);

  public countItems = computed(() => this.cartItems().length);

  public totalPrice = computed(() => {
    const items = this.cartItems();

    return items.reduce((prev, current) => {
      return prev + current.product.price * current.quantity;
    }, 0);
  });

  getCart = computed(() => this.cartItems());

  addProduct(product: Product) {
    this.cartItems.update((currentCartItems) => {
      const exists = currentCartItems.find(
        (item) => item.product.id === product.id
      );
  
      if (exists) {
        if (exists.quantity >= exists.product.rating.count) {
          alert(`${exists.product.title} is out of stock!`);
          return currentCartItems;
        } else {
          const updatedCartItems = currentCartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          console.log('Updated Cart:', updatedCartItems);
          return updatedCartItems;
        }
      } else {
        const newCartItems = [...currentCartItems, { product, quantity: 1 }];
        console.log('New Cart:', newCartItems);
        return newCartItems;
      }
    });
  }
  
  removeItem(productId: number) {
    console.log("🗑️ Removing product with ID:", productId);
    
    this.cartItems.update(items => {
      const newCart = items.filter(item => item.product.id !== productId);
      console.log("📦 Updated Cart:", newCart);
      return [...newCart]; // 🔥 Force Signal Update
    });

    console.log("✅ Cart successfully updated!");
  }

  checkStock(index: number) {
    this.cartItems.update((currentCartItems) => {
      if (index >= 0 && index < currentCartItems.length) {
        const item = currentCartItems[index];
        if (item.quantity >= item.product.rating.count) {
          alert(`You reached maximum amount of ${item.product.title}`);
          return currentCartItems.map((currentItem, currentIndex) =>
            currentIndex === index
              ? { ...item, quantity: item.product.rating.count }
              : currentItem
          );
        }
      }
      return currentCartItems;
    });
  }

  incQuantity(index: number) {
    this.cartItems.update((currentCartItems) => {
      if (index >= 0 && index < currentCartItems.length) {
        const item = currentCartItems[index];
        if (item.quantity >= item.product.rating.count) {
          alert(`You reached maximum amount of ${item.product.title}`);
          return currentCartItems;
        }

        return currentCartItems.map((currentItem, currentIndex) =>
          currentIndex === index
            ? { ...item, quantity: item.quantity + 1 }
            : currentItem
        );
      }
      return currentCartItems;
    });
  }

  decQuantity(idx: number) {
    this.cartItems.update((currentCartItems) => {
      if (idx >= 0 && idx < currentCartItems.length) {
        const item = currentCartItems[idx];

        if (item.quantity > 0) {
          const updatedItems = currentCartItems.map((currentItem, index) =>
            index === idx
              ? { ...currentItem, quantity: currentItem.quantity - 1 }
              : currentItem
          );

          return updatedItems.filter((item) => item.quantity > 0);
        }
      }

      return currentCartItems;
    });
  }

  clearCart() {
    this.cartItems.set([]);
  }

}
