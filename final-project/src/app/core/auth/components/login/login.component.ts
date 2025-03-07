import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/login.service';
import { ILoginRequest, ILoginResponse } from '../../models/auth.model';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../state/auth.actions';
import { AuthState } from '../../state/auth.reducers';
import { GenerateUserIdService } from '../../services/generate-user-id.service';
import { CommonModule } from '@angular/common';
import { catchError, firstValueFrom, tap, throwError } from 'rxjs'; 
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginFail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private authApiService: AuthApiService,
    private generateID: GenerateUserIdService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  
  onLogin() {
    const newForm: ILoginRequest = this.loginForm.value;
    this.authApiService.login(newForm).pipe(
      tap(data => {
        this.auth.storeToken(data.accessToken, data.refreshToken);
        this.router.navigate(['/']).then(() => {});
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
  

  
}
