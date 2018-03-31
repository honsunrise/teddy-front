import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavigationComponent} from './navigation.component';
import {NavVerticalItemComponent} from './vertical/nav-item/nav-vertical-item.component';
import {NavVerticalCollapseComponent} from './vertical/nav-collapse/nav-vertical-collapse.component';
import {NavVerticalGroupComponent} from './vertical/nav-group/nav-vertical-group.component';
import {NavHorizontalItemComponent} from './horizontal/nav-item/nav-horizontal-item.component';
import {NavHorizontalCollapseComponent} from './horizontal/nav-collapse/nav-horizontal-collapse.component';
import {MaterialModule} from '../../shared/material.module';
import {CommonModule} from '@angular/common';
import {NavigationFakeLoader, NavigationLoader} from './navigation.loader';
import {NavigationService} from './navigation.service';
import {SharedModule} from '../../shared/shared.module';

export interface NavigationModuleConfig {
  loader?: Provider;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    NavigationComponent
  ],
  declarations: [
    NavigationComponent,
    NavVerticalGroupComponent,
    NavVerticalItemComponent,
    NavVerticalCollapseComponent,
    NavHorizontalItemComponent,
    NavHorizontalCollapseComponent
  ],
  providers: [
    NavigationService
  ]
})
export class NavigationModule {
  static forRoot(config: NavigationModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: NavigationModule,
      providers: [
        config.loader || {provide: NavigationLoader, useClass: NavigationFakeLoader}
      ]
    };
  }
}
