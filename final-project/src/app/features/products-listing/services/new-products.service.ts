import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class NewProductsService {
  constructor(private http: HttpClient) {}
  getNewProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/mock.data.json');
  }

  getProductsById(id: number): Observable<Product | undefined> {
    return this.getNewProducts().pipe(
      map((products) => products.find((product) => product.id === id))
    );
  }
}
