import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/env.dev';
import { ISignUpRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = `${environment.loginURL}/users/add`;

  constructor(private http: HttpClient) {}

  signup(user: ISignUpRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
