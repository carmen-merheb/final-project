import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from '../../../../core/auth/services/auth-api.service';
import { IUser } from '../../../../core/auth/models/user.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent {
  private authService = inject(AuthApiService);
  private fb = inject(FormBuilder);
  
  userInfo = signal<IUser | undefined>(undefined);
  editMode = signal(false);
  profileForm!: FormGroup;

  ngOnInit() {
    this.authService.getAuthUser().subscribe(user => {
      this.userInfo.set(user);
      this.initForm(user);
    });
  }

  /** ✅ Initialize Form with Existing User Data */
  private initForm(user: IUser) {
    this.profileForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      phone: [user.phone, Validators.required],
      //address: [user.address, Validators.required]
    });
  }

  /** ✅ Toggle Edit Mode */
  enableEdit() {
    this.editMode.set(true);
  }

  /** ✅ Save Updated Info */
  saveChanges() {
    if (this.profileForm.valid) {
      const updatedUser = { ...this.userInfo(), ...this.profileForm.value };

      this.authService.updateUserProfile(updatedUser).subscribe(updated => {
        this.userInfo.set(updated);
        this.editMode.set(false);
      });
    }
  }

  /** ✅ Cancel Editing */
  cancelEdit() {
    this.initForm(this.userInfo()!);
    this.editMode.set(false);
  }
}
