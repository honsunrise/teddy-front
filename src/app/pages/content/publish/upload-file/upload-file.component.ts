import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Ng2FileInputAction} from './upload-file.interface';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs/util/noop';
import {Observable} from 'rxjs/Rx';
import {Subscriber} from 'rxjs/Subscriber';

function isSameFile(file1: File, file2: File): boolean {
  return file1.name === file2.name && file1.size === file2.size && file1.type === file2.type;
}

export const UPLOAD_FILE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UploadFileComponent),
  multi: true
};

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [UPLOAD_FILE_CONTROL_VALUE_ACCESSOR]
})
export class UploadFileComponent implements OnInit, OnDestroy, ControlValueAccessor {
  fileIsOver = false;
  invalidFile = false;
  currentFiles: File[] = [];
  isDisable = false;

  @Input() id: string;
  @Input('drop-text') dropText = 'Drop file here';
  @Input('browse-text') browseText = 'Browse';
  @Input('remove-text') removeText = 'Remove';
  @Input('invalid-file-text') invalidFileText = 'You have picked an invalid or disallowed file.';
  @Input('invalid-file-timeout') invalidFileTimeout = 8000;
  @Input('multiple') multiple = false;
  @Input('removable') removable = true;
  @Input('show-previews') showPreviews = true;
  @Input('extensions') extensions: string[] = [];
  @Output('onAction') outputAction = new EventEmitter();
  @Output('onRemoved') outputRemoved = new EventEmitter();
  @Output('onAdded') outputAdded = new EventEmitter();
  @Output('onInvalidDenied') outputInvalidDenied = new EventEmitter();
  @Output('onNotAllowRemove') outputNotAllowRemove = new EventEmitter();
  private alreadyEmitted = false;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private cacheDataUrl: Map<File, string> = new Map();

  constructor() {
  }

  ngOnInit() {
    if (!this.id) {
      this.id = this.generateId();
    }
  }

  ngOnDestroy() {
  }

  writeValue(obj: any): void {
    if (obj !== this.currentFiles) {
      this.currentFiles = obj;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  onBlur() {
    this.onTouchedCallback();
  }

  onFileDrop(file: File): void {
    if (!this.multiple) {
      if (!this.alreadyEmitted) {
        this.alreadyEmitted = true;
        this.handleFile(file);
        setTimeout(() => {
          this.alreadyEmitted = false;
        }, 0);
      }
    } else {
      this.handleFile(file);
    }
  }

  fileSelected(event): void {
    this.invalidFile = false;
    const files = event.target.files;
    if (files && files.length) {
      if (!this.multiple) {
        this.handleFile(files[0]);
      } else {
        for (let i = 0; i < files.length; i++) {
          this.handleFile(files[i]);
        }
      }
    }
    setTimeout(() => {
      event.target.value = '';
    }, 0);
  }

  removeFile(file: File) {
    if (this.removable) {
      for (let i = 0; this.currentFiles.length; i++) {
        if (isSameFile(file, this.currentFiles[i])) {
          this.currentFiles.splice(i, 1);
        }
      }
      this.emitOutput(file, Ng2FileInputAction.Removed);
    } else {
      this.emitOutput(file, Ng2FileInputAction.NotAllowRemove);
    }
  }

  getObjectUrl(file: File): Observable<string> {
    return Observable.create((observer: Subscriber<string>) => {
      const result = this.cacheDataUrl.get(file);
      if (typeof result === 'undefined' || result == null) {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', evt => {
          const url = (evt.target as FileReader).result;
          this.cacheDataUrl.set(file, url);
          observer.next(url);
          observer.complete();
        });
        fileReader.readAsDataURL(file);
      } else {
        observer.next(result);
        observer.complete();
      }
    });
  }

  private handleFile(file: File): void {
    if (this.isValidFile(file)) {
      if (this.multiple) {
        this.currentFiles.push(file);
      } else {
        this.currentFiles = [];
        this.currentFiles.push(file);
      }
      this.emitOutput(file, Ng2FileInputAction.Added);
    } else {
      this.emitOutput(file, Ng2FileInputAction.InvalidDenied);
    }
  }

  private emitOutput(file: File, action: Ng2FileInputAction): void {
    this.onChangeCallback(this.currentFiles);
    this.outputAction.emit({
      id: this.id,
      action: action,
      currentFiles: this.currentFiles,
      file: file
    });
    switch (action) {
      case Ng2FileInputAction.Added:
        this.outputAdded.emit({
          id: this.id,
          currentFiles: this.currentFiles,
          file: file
        });
        break;
      case Ng2FileInputAction.Removed:
        this.outputRemoved.emit({
          id: this.id,
          currentFiles: this.currentFiles,
          file: file
        });
        break;
      case Ng2FileInputAction.InvalidDenied:
        this.outputInvalidDenied.emit({
          id: this.id,
          currentFiles: this.currentFiles,
          file: file
        });
        break;
      case Ng2FileInputAction.NotAllowRemove:
        this.outputNotAllowRemove.emit({
          id: this.id,
          currentFiles: this.currentFiles,
          file: file
        });
        break;
    }
  }

  private isValidFile(file: File): Boolean {
    if (this.extensions.length > 0) {
      const ext: string = file.name.split('.').pop();
      if ((this.extensions.indexOf('image/jpg') !== -1) && (this.extensions.indexOf('image/jpeg') === -1)) {
        this.extensions.push('image/jpeg');
      }
      if (this.extensions.indexOf(file.type) === -1 && this.extensions.indexOf(ext) === -1) {
        this.invalidFile = true;
        if (this.invalidFileTimeout !== 0) {
          setTimeout(() => {
            this.invalidFile = false;
          }, this.invalidFileTimeout);
        }

        return false;
      }
    }
    return true;
  }

  private generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
