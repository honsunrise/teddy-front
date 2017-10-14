import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { WatchComponent } from './watch.component';
import { WatchRoutes } from './watch.routing';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCardModule, MdIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WatchRoutes),
    MdIconModule,
    MdCardModule,
    MdButtonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FlexLayoutModule,
  ],
  declarations: [WatchComponent]
})

export class WatchModule {
}
