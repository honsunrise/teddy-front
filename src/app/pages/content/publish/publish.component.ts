import { Component, Inject, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { APP_CONFIG } from '../../../app.config.constants';
import { IAppConfig } from '../../../app.config.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ContentService } from '../../../service/content/content.service';

@Component({
  selector: 'app-blank',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  form: FormGroup;

  constructor(@Inject(APP_CONFIG) private config: IAppConfig,
              private contentService: ContentService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: this.config.uploadEndpoint,
      isHTML5: true
    });

    this.form = this.fb.group({
      title: [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ])],
      content: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])],
      canReview: [null, Validators.compose([Validators.required])],
      external: [null, Validators.compose([Validators.required])],
      movieUrl: [null, Validators.compose([Validators.required, CustomValidators.url])],
    });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  onSubmit() {
    this.contentService.publishInfo(this.form.value['title'], this.form.value['content'],
      [], this.form.value['movieUrl'],
      this.form.value['external'], this.form.value['canReview']).subscribe(data => {
      console.log('Publish info success!');
    });
  }
}