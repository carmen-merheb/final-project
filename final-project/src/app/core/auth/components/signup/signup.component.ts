import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { ISignUpResponse } from '../../models/auth.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'], 
  imports: [ReactiveFormsModule, CommonModule], 
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  StrongPasswordRegx: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  constructor(private fb: FormBuilder, private auth: SignupService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    console.log('Form submitted', this.signupForm.value);

    this.auth.signup(this.signupForm.value).subscribe({
      next: (res: ISignUpResponse) => {
        console.log('Signup successful:', res);
        alert('Signup successful! Redirecting to login...');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again.');
      },
    });
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  goToLogin() {
    console.log('Navigating to login...');
    this.router.navigate(['/login']).then(() => {
      console.log('Navigation to login successful!');
    }).catch(err => {
      console.error('Navigation failed:', err);
    });
  }
}
