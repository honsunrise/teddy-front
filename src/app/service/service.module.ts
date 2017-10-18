import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from './content/content.service';
import { AccountService } from './account/account.service';
import { EmbedVideoService } from './embed-video/embed-video.service';
import { MessageService } from './message/message.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ContentService,
    AccountService,
    EmbedVideoService,
    MessageService
  ],
  declarations: []
})
export class ServiceModule {
}
