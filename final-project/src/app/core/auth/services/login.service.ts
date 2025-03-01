import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/env.dev';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest, ILoginResponse } from '../models/auth.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}

  login(req: ILoginRequest): Observable<ILoginResponse> {
    const loginURL = environment.loginURL; 
    return this.http.post<ILoginResponse>(loginURL, req).pipe(
      tap((response) => {
        console.log('API Response:', response);
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }

  logout() {
    localStorage.removeItem('user'); 
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}