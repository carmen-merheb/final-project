import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './core/auth/state/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './core/auth/state/auth.effects';
import { AuthModule } from './core/auth/auth.module';
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

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, NavComponent, FooterComponent],
  imports: [
    BrowserModule,
    AuthModule,
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
