import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  errors: Record<string, string> = {};

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*]).+$')
        ]
      ]
    });

    this.signUpForm.valueChanges.subscribe(() => {
      this.errors = {};
    });
  }

  onSubmit(): void {
    if (!this.signUpForm.valid) {
      this.errors['form'] = 'Please fill in all required fields correctly.';
      return;
    }

    this.signupService.signup(this.signUpForm.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errors['signup'] = error.error?.message || 'Signup failed. Please try again.';
      }
    });
  }
  
}
