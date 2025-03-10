export interface IOrder {
    userId: number;
    date: Date;
    items: IOrderItem[];
  }
  
  export interface IOrderItem {
    productId: number;
    productQuantity: number;
  }
  
  export interface IUserLog {
    order: IOrder;
    orderId: number;
    totalPrice: number;
  }
  