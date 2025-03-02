import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class NewProductsService {
  constructor(private http: HttpClient) {}
  getNewProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/mock.data.json');
  }
}
