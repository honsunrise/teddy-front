import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { MainRoutes } from './main.routing';
import { WidgetsModule } from '../../widgets/widgets.module';
import { MasonryModule } from 'angular2-masonry';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainRoutes),
    WidgetsModule,
    MasonryModule
  ],
  declarations: [MainComponent]
})

export class MainModule {

}
