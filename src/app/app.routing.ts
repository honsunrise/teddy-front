import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  component: MainLayoutComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'cate',
    loadChildren: './cate/cate.module#CateModule'
  }, {
    path: 'watch/:id',
    loadChildren: './watch/watch.module#WatchModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
