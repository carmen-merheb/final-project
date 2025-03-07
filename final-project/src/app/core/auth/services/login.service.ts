import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environment/env.dev';
import { IToken } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.hasValidAccessToken());

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  isLoggedIn(): boolean {
    return this.hasValidAccessToken();
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }

  storeToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.authState.next(true);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  
  refreshToken(): Observable<IToken> {
    const refreshToken = this.getRefreshToken();
  
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token found.'));
    }
  
    return this.http.post<IToken>(`${environment.loginURL}/auth/refresh`, { refreshToken }).pipe(
      catchError(() => throwError(() => new Error('Failed to refresh token')))
    );
  }
  

  private hasValidAccessToken(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    const expiry = this.getTokenExpiration(token);
    return expiry ? expiry > Date.now() : false;
  }

  private getTokenExpiration(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 : null;
    } catch (error) {
      return null;
    }
  }
}
