import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  component: MainLayoutComponent,
  children: [{
    path: '',
    loadChildren: './pages/content/content.module#ContentModule'
  }]
}, {
  path: 'session',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    loadChildren: './pages/session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
