import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdCardModule, MdIconModule, MdListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MediaCardComponent } from './media-card/media-card.component';
import { FramedContentComponent } from './framed-content/frame-content.component';
import { SafePipe } from '../pipe/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    MdCardModule,
    MdButtonModule,
    MdListModule,
    ChartsModule,
    FlexLayoutModule,
  ],
  declarations: [
    SafePipe,
    MediaCardComponent,
    FramedContentComponent
  ],
  exports: [
    MediaCardComponent,
    FramedContentComponent
  ]
})
export class WidgetsModule {
}
