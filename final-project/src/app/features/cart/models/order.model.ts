export interface IOrder {
    userId: number;
    date: Date;
    items: {
      productId: number;
      productQuantity: number;
    }[];
  }
  