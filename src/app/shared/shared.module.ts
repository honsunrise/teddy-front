import { NgModule } from '@angular/core';

import { ToggleFullscreenDirective } from './directive/toggle-fullscreen.directive';
import { StopPropagationDirective } from './directive/stop-propagation.directive';
import { DelayShowDirective } from './directive/delay-show.directive';
import { PerfectScrollbarDirective } from './directive/perfect-scrollbar.directive';
import { SafePipe } from './pipes/safe.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { HtmlToPlaintextPipe } from './pipes/htmlToPlaintext.pipe';
import { GetByIdPipe } from './pipes/getById.pipe';
import { BusyModule } from 'angular2-busy';
import { RlTagInputModule } from 'angular2-tag-input/dist';

@NgModule({
  imports: [
    BusyModule,
    RlTagInputModule
  ],
  declarations: [
    ToggleFullscreenDirective,
    StopPropagationDirective,
    DelayShowDirective,
    PerfectScrollbarDirective,
    SafePipe,
    KeysPipe,
    HtmlToPlaintextPipe,
    GetByIdPipe,
  ],
  exports: [
    ToggleFullscreenDirective,
    StopPropagationDirective,
    DelayShowDirective,
    PerfectScrollbarDirective,
    SafePipe,
    KeysPipe,
    HtmlToPlaintextPipe,
    GetByIdPipe,
    BusyModule,
    RlTagInputModule
  ]
})
export class SharedModule {
}
