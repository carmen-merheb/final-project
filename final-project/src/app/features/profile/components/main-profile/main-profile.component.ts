import { Component, inject } from '@angular/core';
import { AuthApiService } from '../../../../core/auth/services/auth-api.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { PreviousOrdersComponent } from '../previous-orders/previous-orders.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-main-profile',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ProfileInfoComponent, PreviousOrdersComponent, MatIconModule, MatDividerModule],
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss'],
})
export class MainProfileComponent {
  private authService = inject(AuthApiService);
  userInfo = this.authService.userInfo;

  ngOnInit() {
    if (!this.userInfo()) {
      this.authService.getAuthUser().subscribe();
    }
  }
}
