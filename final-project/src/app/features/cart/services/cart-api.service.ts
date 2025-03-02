import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/env.dev';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  constructor(private http: HttpClient) {}

  sendCart(cart: any) {
    return this.http.post(`${environment.apiURL}carts`, cart);
  }
}
