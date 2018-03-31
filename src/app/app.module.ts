import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutes} from './app.routing';
import {AppComponent} from './app.component';
import {MainLayoutComponent} from './layouts/main/main-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {ServiceModule} from './service/service.module';
import {APP_CONFIG, APP_DI_CONFIG} from './app.config.constants';
import {MaterialModule} from './shared/material.module';
import {NavigationModule} from './widgets/navigation/navigation.module';
import {NavigationLoader} from './widgets/navigation/navigation.loader';
import {AuthService} from './auth/auth.service';
import {AuthNavigationLoader} from './app.auth.navigation.loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function createNavigationLoader(authService: AuthService) {
  return new AuthNavigationLoader(authService);
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SharedModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MaterialModule,
    NavigationModule.forRoot({
      loader: {
        provide: NavigationLoader,
        useFactory: (createNavigationLoader),
        deps: [AuthService]
      }
    }),
    FlexLayoutModule,
    ServiceModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_DI_CONFIG}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
