import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { PreviousOrdersComponent } from './components/previous-orders/previous-orders.component';
import { PreviousOrderDetailsComponent } from './components/previous-order-details/previous-order-details.component';


const routes: Routes = [
  { path: '', component: MainProfileComponent },
  { path: 'info', component: ProfileInfoComponent },
  { path: 'orders', component: PreviousOrdersComponent },
  { path: 'orders/:id', component: PreviousOrderDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
