import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {APP_CONFIG} from '../../../app.config.constants';
import {IAppConfig} from '../../../app.config.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {ContentService} from '../../../service/content/content.service';
import {UploadService} from '../../../service/upload/upload.service';
import {FileUploader} from '../../../service/upload/file-uploader.class';
import {UploadToken} from '../../../service/domain/uploadToken';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  selector: 'dialog-publish-complete',
  template: '<h1 mat-dialog-title>Publish Complete</h1>\n' +
  '<div mat-dialog-content>This movie is publish complete, click close to return.</div>\n' +
  '<div mat-dialog-actions>\n' +
  '  <button mat-button mat-dialog-close>Close</button>\n' +
  '</div>'
})
export class DialogPublishCompleteComponent {
  constructor(public dialogRef: MatDialogRef<DialogPublishCompleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}

@Component({
  selector: 'dialog-publish-error',
  template: '<h1 mat-dialog-title>Publish Error</h1>\n' +
  '<div mat-dialog-content>This movie is publish error, click close to return.</div>\n' +
  '<div mat-dialog-actions>\n' +
  '  <button mat-button mat-dialog-close>Close</button>\n' +
  '</div>'
})
export class DialogPublishErrorComponent {
  constructor(public dialogRef: MatDialogRef<DialogPublishErrorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}

@Component({
  selector: 'dialog-cancel-confirm',
  template: '<h1 mat-dialog-title>Cancel</h1>\n' +
  '<div mat-dialog-content>Are you sure cancel publish info?</div>\n' +
  '<div mat-dialog-actions>\n' +
  '  <button mat-button mat-dialog-close="true">Yes</button>\n' +
  '  <button mat-button mat-dialog-close="false">No</button>\n' +
  '</div>'
})
export class DialogCancelConfirmComponent {
  constructor(public dialogRef: MatDialogRef<DialogCancelConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  link: FormGroup;
  upload: FormGroup;

  uploading = false;
  uploader: FileUploader;
  @ViewChild('stepper')
  stepper: CdkStepper;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              public dialog: MatDialog,
              private contentService: ContentService,
              private uploadService: UploadService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.uploader = this.uploadService.getFileUploader();
    this.upload = this.fb.group({
      movie: [[], Validators.compose([Validators.required, Validators.max(1)])],
    });

    this.link = this.fb.group({
      movieUrl: ['', Validators.compose([Validators.required, CustomValidators.url])],
      cover: [[], Validators.compose([Validators.required, Validators.max(9)])]
    });

    this.firstFormGroup = this.fb.group({
      external: [false, Validators.compose([Validators.required])],
      upload: this.upload
    });

    let modify = false;
    this.firstFormGroup.valueChanges.subscribe(value => {
      if (modify) {
        return;
      } else {
        modify = true;
        if (value.external) {
          this.firstFormGroup.removeControl('upload');
          this.firstFormGroup.addControl('link', this.link);
        } else {
          this.firstFormGroup.removeControl('link');
          this.firstFormGroup.addControl('upload', this.upload);
        }
      }
      modify = false;
    });

    this.secondFormGroup = this.fb.group({
      title: [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ])],
      content: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(500)
      ])],
      tags: [[], Validators.compose([Validators.required])],
      canReview: [true, Validators.compose([Validators.required])],
    });
  }

  cancelPublish() {
    this.dialog.open(DialogCancelConfirmComponent, {
      width: '250px',
    }).afterClosed().subscribe((ans) => {
      if (ans) {
        this.uploader.cancelAll();
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    let title: string;
    let content: string;
    let canReview: boolean;
    let tags: string[];
    const getInfo = () => {
      title = this.secondFormGroup.value['title'];
      content = this.secondFormGroup.value['content'];
      canReview = this.secondFormGroup.value['canReview'];
      tags = this.secondFormGroup.value['tags'];
    };
    if (!this.uploading) {
      this.uploading = true;
      this.uploader.clearQueue();
      getInfo();
      const externalLink = this.firstFormGroup.value['external'];
      if (externalLink) {
        this.uploader.addToQueue(this.link.value['cover']);
        this.uploader.uploadAll()
          .subscribe((tokens: UploadToken[]) => {
            const movie = this.link.value['movieUrl'];
            this.contentService.publishInfo(title, content,
              tokens.map((token) => token.token), movie,
              externalLink, canReview, tags)
              .subscribe(data => {
                this.dialog.open(DialogPublishCompleteComponent, {
                  width: '250px',
                }).afterClosed().subscribe(() => {
                  this.router.navigate(['/']);
                });
              }, error => {
                this.dialog.open(DialogPublishErrorComponent, {
                  width: '250px',
                }).afterClosed().subscribe(() => {
                  this.uploading = false;
                  this.stepper.previous();
                });
              });
          }, error => {
            this.dialog.open(DialogPublishErrorComponent, {
              width: '250px',
            }).afterClosed().subscribe(() => {
              this.uploading = false;
              this.stepper.previous();
            });
          });
      } else {
        this.uploader.addToQueue(this.upload.value['movie']);
        this.uploader.uploadAll()
          .subscribe((tokens: UploadToken[]) => {
            this.contentService.publishInfo(title, content,
              [], tokens.map((token) => token.token)[0],
              externalLink, canReview, tags)
              .subscribe(data => {
                this.dialog.open(DialogPublishCompleteComponent, {
                  width: '250px',
                }).afterClosed().subscribe(() => {
                  this.router.navigate(['/']);
                });
              }, error => {
                this.dialog.open(DialogPublishErrorComponent, {
                  width: '250px',
                }).afterClosed().subscribe(() => {
                  this.uploading = false;
                  this.stepper.previous();
                });
              });
          }, error => {
            this.dialog.open(DialogPublishErrorComponent, {
              width: '250px',
            }).afterClosed().subscribe(() => {
              this.uploading = false;
              this.stepper.previous();
            });
          });
      }
    } else {
      getInfo();
    }
  }
}
