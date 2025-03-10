import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../core/auth/services/auth-api.service';
import { IUser } from '../../../../core/auth/models/user.model';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CheckoutFormComponent implements OnInit {
  userInfo = signal<IUser | undefined>(undefined);
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthApiService) {}

   ngOnInit() {
      this.authService.getAuthUser().subscribe(user => {
        this.userInfo.set(user);
        this.initForm(user);
      });
    }
  
    private initForm(user: IUser) {
      this.profileForm = this.fb.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        phone: [user.phone, Validators.required],
        address: [user.address.address, Validators.required],
        city: [user.address.city, Validators.required],
      });
    }
}
