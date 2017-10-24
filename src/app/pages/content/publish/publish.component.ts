import { Component, Inject, OnInit } from '@angular/core';
import { APP_CONFIG } from '../../../app.config.constants';
import { IAppConfig } from '../../../app.config.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ContentService } from '../../../service/content/content.service';
import { UploadService } from '../../../service/upload/upload.service';
import { FileUploader } from '../../../service/upload/file-uploader.class';
import { UploadToken } from '../../../service/domain/uploadToken';

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

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private contentService: ContentService,
              private uploadService: UploadService,
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
      canReview: [true, Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    this.uploading = true;
    this.uploader.clearQueue();
    const externalLink = this.firstFormGroup.value['external'];
    const title = this.secondFormGroup.value['title'];
    const content = this.secondFormGroup.value['content'];
    const canReview = this.secondFormGroup.value['canReview'];
    if (externalLink) {
      this.uploader.addToQueue(this.link.value['cover']);
      this.uploader.uploadAll().subscribe((tokens: UploadToken[]) => {
        const movie = this.link.value['movieUrl'];
        this.contentService.publishInfo(title, content,
          tokens.map((token) => token.token), movie,
          externalLink, canReview).subscribe(data => {
        }, error => {
          console.log(error);
        });
      });
    } else {
      this.uploader.addToQueue(this.upload.value['movie']);
      this.uploader.uploadAll();
      // this.contentService.publishInfo(title, content,
      //   [], movie,
      //   externalLink, canReview).subscribe(data => {
      // }, error => {
      //   console.log(error);
      // });
    }
  }
}
