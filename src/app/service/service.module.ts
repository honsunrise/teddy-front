import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentService} from './content/content.service';
import {AccountService} from './account/account.service';
import {EmbedVideoService} from './embed-video/embed-video.service';
import {MessageService} from './message/message.service';
import {CopierService} from './copier/copier.service';
import {SplashScreenService} from './splash/splash-screen.service';
import {UploadService} from './upload/upload.service';
import {UserService} from './user/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ContentService,
    AccountService,
    EmbedVideoService,
    MessageService,
    CopierService,
    SplashScreenService,
    UploadService,
    UserService
  ],
  declarations: []
})
export class ServiceModule {
}
