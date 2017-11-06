import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ContentRoutes } from './content.routing';
import { BlankComponent } from './blank/blank.component';
import { WidgetsModule } from '../../widgets/widgets.module';
import { MasonryModule } from 'angular2-masonry';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { WatchComponent } from './watch/watch.component';
import { MainComponent } from './main/main.component';
import { CateComponent } from './cate/cate.component';
import {
  DialogCancelConfirmComponent,
  DialogPublishCompleteComponent,
  DialogPublishErrorComponent,
  PublishComponent
} from './publish/publish.component';
import { QuillModule } from 'ngx-quill/src/quill.module';
import { HttpClientModule } from '@angular/common/http';
import { PlayListComponent } from './playlist/playlist.component';
import { ProfileComponent } from './profile/profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { UploadFileComponent } from './publish/upload-file/upload-file.component';
import { FileDropDirective } from 'angular2-file-drop/build/file-drop';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ContentRoutes),
    FormsModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    NgxDatatableModule,
    FlexLayoutModule,
    MasonryModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    QuillModule,
    HttpClientModule,
    WidgetsModule
  ],
  declarations: [
    BlankComponent,
    MainComponent,
    CateComponent,
    WatchComponent,
    PublishComponent,
    PlayListComponent,
    ProfileComponent,
    UploadFileComponent,
    FileDropDirective,
    DialogPublishCompleteComponent,
    DialogCancelConfirmComponent,
    DialogPublishErrorComponent
  ],
  entryComponents: [
    DialogPublishCompleteComponent,
    DialogCancelConfirmComponent,
    DialogPublishErrorComponent
  ]
})

export class ContentModule {
}
