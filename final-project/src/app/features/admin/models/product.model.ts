export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number; 
    status: 'In Stock' | 'Low Stock' | 'Out of Stock'; 
    category: string;
    imageUrl: string;
    createdBy: string; 
  }
  