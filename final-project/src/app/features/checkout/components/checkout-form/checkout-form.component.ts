import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../core/auth/services/auth-api.service';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CheckoutFormComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(private fb: FormBuilder, private authApiService: AuthApiService) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.authApiService.getAuthUser().subscribe(user => {
      this.checkoutForm.patchValue(user);
    });
  }
}
