import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MediaCardComponent } from './media-card/media-card.component';
import { FramedContentComponent } from './framed-content/frame-content.component';
import { SafePipe } from '../pipes/safe.pipe';
import { StopPropagationDirective } from '../directive/stop-propagation.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CountdownComponent } from './countdown/countdown.component';
import { MaterialColorPickerComponent } from './material-color-picker/material-color-picker.component';
import { MaterialModule } from '../shared/material.module';
import { KeysPipe } from '../pipes/keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule,
    FlexLayoutModule
  ],
  declarations: [
    SafePipe,
    KeysPipe,
    StopPropagationDirective,
    MediaCardComponent,
    FramedContentComponent,
    ConfirmDialogComponent,
    CountdownComponent,
    MaterialColorPickerComponent
  ],
  exports: [
    MediaCardComponent,
    FramedContentComponent,
    ConfirmDialogComponent,
    CountdownComponent,
    MaterialColorPickerComponent,
  ]
})
export class WidgetsModule {
}
