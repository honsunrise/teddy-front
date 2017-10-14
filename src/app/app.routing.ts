import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AuthGuard } from './auth/auth.guard.service';

export const AppRoutes: Routes = [{
  path: '',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'cate',
    loadChildren: './pages/cate/cate.module#CateModule'
  }, {
    path: 'watch/:id',
    loadChildren: './pages/watch/watch.module#WatchModule'
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './pages/session/session.module#SessionModule'
  }]
}, {
  path: '**',
  redirectTo: 'session/404'
}];
