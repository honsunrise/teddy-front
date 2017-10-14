import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { WidgetsModule } from '../../widgets/widgets.module';
import { MasonryModule } from 'angular2-masonry';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    WidgetsModule,
    MasonryModule
  ],
  declarations: [DashboardComponent]
})

export class DashboardModule {

}
