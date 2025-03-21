import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './core/auth/state/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './core/auth/state/auth.effects';
import { NavComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { MainProfileComponent } from './features/profile/components/main-profile/main-profile.component';
import { PreviousOrdersComponent } from './features/profile/components/previous-orders/previous-orders.component';
import { ProfileInfoComponent } from './features/profile/components/profile-info/profile-info.component';
import { CheckoutPaymentComponent } from './features/checkout/components/checkout-payment/checkout-payment.component';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, NavComponent, FooterComponent, MainProfileComponent, PreviousOrdersComponent, ProfileInfoComponent, CheckoutPaymentComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot(authReducer),
    EffectsModule.forRoot([AuthEffect]),
    MatDividerModule,
    RouterModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FormsModule,
  ],

  bootstrap: [AppComponent],

  providers: [provideAnimationsAsync(), provideHttpClient()],
})
export class AppModule {}