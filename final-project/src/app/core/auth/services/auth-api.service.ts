import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environment/env.dev';
import { ILoginRequest, ILoginResponse, ISignUpRequest, ISignUpResponse } from '../models/auth.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private authUrl: string = environment.loginURL;
  private userInfoSubject = new BehaviorSubject<IUser | null>(null);

  userInfo$ = this.userInfoSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(form: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.authUrl}/auth/login`, form).pipe(
      catchError(error => this.handleError(error))
    );
  }

  signup(form: ISignUpRequest): Observable<ISignUpResponse> {
    return this.http.post<ISignUpResponse>(`${this.authUrl}/users/add`, form).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getAuthUser(): Observable<IUser> {
    return this.http.get<IUser>(`${this.authUrl}/user/me`).pipe(
      tap(user => this.userInfoSubject.next(user)), 
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
