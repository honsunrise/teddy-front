import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from './content/content.service';
import { AccountService } from './account/account.service';
import { EmbedVideoService } from './embed-video/embed-video.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ContentService,
    AccountService,
    EmbedVideoService,
  ],
  declarations: []
})
export class ServiceModule { }
