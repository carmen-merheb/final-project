import { Product } from '../models/product.model';
import { SalesData } from '../models/sales-data.model';

export const PRODUCTS: Product[] = [
  { id: '1', name: 'Laptop', price: 1200, stock: 50, status: 'In Stock', category: 'Electronics', imageUrl: 'laptop.jpg', createdBy: 'admin1' },
  { id: '2', name: 'Smartphone', price: 800, stock: 10, status: 'Low Stock', category: 'Electronics', imageUrl: 'phone.jpg', createdBy: 'admin2' },
  { id: '3', name: 'Headphones', price: 150, stock: 0, status: 'Out of Stock', category: 'Accessories', imageUrl: 'headphones.jpg', createdBy: 'admin1' }
];

export const SALES_DATA: SalesData[] = [
  { productId: '1', productName: 'Laptop', quantitySold: 20, totalRevenue: 24000, saleDate: new Date('2024-03-01') },
  { productId: '2', productName: 'Smartphone', quantitySold: 15, totalRevenue: 12000, saleDate: new Date('2024-03-02') }
];
