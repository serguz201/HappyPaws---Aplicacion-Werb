import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: false }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['https://happypawsback-end.onrender.com'],
          disallowedRoutes: ['https://happypawsback-end.onrender.com/login/forget'],
          //allowedDomains: ['localhost:8080'],
          //disallowedRoutes: ['http://localhost:8080/login/forget'],
        },
      })
    ), provideAnimationsAsync(),]
};