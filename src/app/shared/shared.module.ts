import { NgModule } from '@angular/core';

import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';

@NgModule({
  declarations: [
    ToggleFullscreenDirective
  ],
  exports: [
    ToggleFullscreenDirective
  ]
})
export class SharedModule {
}
