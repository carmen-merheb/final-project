import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environment/env.dev';
import { ILoginRequest, ILoginResponse, ISignUpRequest, ISignUpResponse } from '../models/auth.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private authUrl: string = environment.loginURL;
  userInfo = signal<IUser | undefined>(undefined);

  constructor(private http: HttpClient) {}

  login(form: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.authUrl}/auth/login`, form).pipe(
      tap(response => console.log("✅ Login Successful: ", response)),
      catchError(error => this.handleError(error)) // 🔥 Calls error handler
    );
  }

  getAuthUser(): Observable<IUser> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAccessToken()}`);

    return this.http.get<IUser>(`${this.authUrl}/user/me`, { headers }).pipe(
      tap(response => {
        this.userInfo.set(response);
        console.log("✅ User Info: ", response);
      }),
      catchError(error => this.handleError(error))
    );
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("🚨 API Error:", error);
    
    if (error.status === 401) {
      console.error("❌ Unauthorized (401) - Invalid Token or Expired Session");
      alert("Session expired. Please log in again.");
    } else if (error.status === 403) {
      console.error("🚫 Forbidden (403) - Access Denied");
    } else if (error.status === 500) {
      console.error("💥 Server Error (500) - Something went wrong on the backend");
    }

    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
