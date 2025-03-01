import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store'; // ✅ Import NGRX Store
import { provideEffects } from '@ngrx/effects'; // ✅ Import Effects if needed
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { authReducer } from './app/core/auth/state/auth.reducers'; // ✅ Import your Auth Reducer

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ auth: authReducer }), // ✅ Provide NGRX Store with Auth Reducer
  ]
}).catch(err => console.error(err));
