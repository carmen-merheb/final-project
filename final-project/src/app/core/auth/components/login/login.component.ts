import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../../services/login.service';
import { ILoginRequest, ILoginResponse } from '../../models/auth.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../state/auth.actions';
import { AuthState } from '../../state/auth.reducers';
import { GenerateUserIdService } from '../../services/generate-user-id.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs'; 

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginFail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: UserAuthService,
    private router: Router,
    private store: Store<AuthState>,
    private generateID: GenerateUserIdService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const val: ILoginRequest = this.loginForm.value;
    console.log(val);

    try {
      // Convert Observable to Promise safely
      const user: ILoginResponse | undefined = await firstValueFrom(this.auth.login(val));

      if (!user || !user.Login?.AccessToken) {
        throw new Error('Invalid login response');
      }

      const hashedUserId = await this.generateID.stringToHash(val.username);

      this.store.dispatch(
        login({
          email: val.username,
          token: user.Login.AccessToken,
          userId: hashedUserId,
        })
      );

      this.router.navigate(['']);
      this.isLoginFail = false;
    } catch (err) {
      console.error('Login error:', err);
      alert('Login Failed');
      this.isLoginFail = true;
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
