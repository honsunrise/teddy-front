import { Component, Inject, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { APP_CONFIG } from '../../../app.config.constants';
import { IAppConfig } from '../../../app.config.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ContentService } from '../../../service/content/content.service';
import { UploadService } from '../../../service/upload/upload.service';

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
    this.uploader = new FileUploader({
      url: this.config.uploadEndpoint,
      isHTML5: true,
    });

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
    let movieUrl: string;
    let cover: File[];
    let movie: File[];
    if (externalLink) {
      movieUrl = this.link.value['movieUrl'];
      cover = this.link.value['cover'];
      this.uploader.addToQueue(cover);
    } else {
      movie = this.upload.value['movie'];
      this.uploader.addToQueue(movie);
    }
    const title = this.secondFormGroup.value['title'];
    const content = this.secondFormGroup.value['content'];
    const canReview = this.secondFormGroup.value['canReview'];

    this.contentService.publishInfo(title, content,
      [], movieUrl,
      externalLink, canReview).subscribe(data => {
      this.uploadService.uploadFileAll(cover[0], 5).subscribe((value) => {
        console.log('Upload complete' + value);
      });
    }, error => {
      console.log(error);
    });
  }

  uploadTest() {
    const cover = this.link.value['cover'];
    this.uploadService.uploadFileAll(cover[0], 5).subscribe((value) => {
      console.log('Upload complete' + value);
    });
  }
}
