import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProfileComponent } from './components/main-profile/main-profile.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { PreviousOrdersComponent } from './components/previous-orders/previous-orders.component';



const routes: Routes = [
  {
    path: '',
    component: MainProfileComponent,
    children: [
      {
        path: 'info',
        component: ProfileInfoComponent,
        outlet: 'profile',
      },
      {
        path: 'orders',
        component: PreviousOrdersComponent,
        outlet: 'profile',
      },
      
    ],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
