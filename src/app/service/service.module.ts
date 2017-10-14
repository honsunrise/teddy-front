import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from './content/content.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ContentService
  ],
  declarations: []
})
export class ServiceModule { }
