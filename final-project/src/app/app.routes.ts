import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./core/auth/components/login/login.component').then(m => m.LoginComponent) },
  { path: '**', redirectTo: 'login' }
];
