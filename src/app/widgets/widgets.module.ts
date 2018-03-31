import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import {ChartsModule} from 'ng2-charts/ng2-charts';
import {MediaCardComponent} from './media-card/media-card.component';
import {FramedContentComponent} from './framed-content/frame-content.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {CountdownComponent} from './countdown/countdown.component';
import {MaterialColorPickerComponent} from './material-color-picker/material-color-picker.component';
import {MaterialModule} from '../shared/material.module';
import {SharedModule} from '../shared/shared.module';
import {InfoListComponent} from './info-list/info-list.component';
import {InfoListItemComponent} from './info-list/mail-list-item/info-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ChartsModule,
    FlexLayoutModule
  ],
  declarations: [
    MediaCardComponent,
    FramedContentComponent,
    ConfirmDialogComponent,
    CountdownComponent,
    MaterialColorPickerComponent,
    InfoListComponent,
    InfoListItemComponent,
  ],
  exports: [
    MediaCardComponent,
    FramedContentComponent,
    ConfirmDialogComponent,
    CountdownComponent,
    MaterialColorPickerComponent,
    InfoListComponent,
    InfoListItemComponent,
  ]
})
export class WidgetsModule {
}
