import {NgModule} from '@angular/core';
import {AuthGuard} from './auth.guard.service';
import {AuthService} from './auth.service';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('auth_token'),
    whitelistedDomains: ['127.0.0.1:8080', '127.0.0.1:8081', '127.0.0.1:8085',
      '69.30.199.90:8080', '69.30.199.90:8081', '69.30.199.90:8085'],
  };
}

@NgModule({
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      }
    })
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthModule {
}

