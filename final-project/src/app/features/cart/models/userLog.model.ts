import { IOrder } from './order.model';

export interface IUserLog {
  order: IOrder;
  orderId: number;
  totalPrice: number;
}
