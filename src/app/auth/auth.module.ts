import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard.service';
import { AuthService } from './auth.service';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => localStorage.getItem('auth_token'),
    whitelistedDomains: ['localhost:8081'],
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

