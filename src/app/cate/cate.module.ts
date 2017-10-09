import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CateComponent } from './cate.component';
import { CateRoutes } from './cate.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CateRoutes),
  ],
  declarations: [CateComponent]
})

export class CateModule {
}
