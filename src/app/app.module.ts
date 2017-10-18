import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { APP_CONFIG, APP_DI_CONFIG } from './app.config.constants';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    FlexLayoutModule,
    AuthModule,
    ServiceModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: APP_DI_CONFIG}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
