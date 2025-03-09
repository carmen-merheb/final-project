export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number; // Number of items in stock
    status: 'In Stock' | 'Low Stock' | 'Out of Stock'; // Stock status
    category: string;
    imageUrl: string;
    createdBy: string; // Admin who issued this product
  }
  