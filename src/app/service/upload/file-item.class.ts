import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export class FileSplit {
  public data: Blob;
}

export interface FileIntmOptions {
  formatDataFunction?: (file: Blob) => Observable<Blob> | Promise<Blob> | Blob;
}

export class FileItem {
  public file: File;
  // state
  public isReady = false;
  public isUploading = false;
  public isUploaded = false;
  public isSuccess = false;
  public isCancel = false;
  public isError = false;
  public progress = 0;
  public subscription: Subscription;

  constructor(file: File) {
    this.file = file;
  }

  public _onBeforeUpload(): void {
    this.isReady = true;
    this.isUploading = true;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = false;
    this.progress = 0;
  }

  public _onProgress(progress: number): void {
    this.progress = progress;
  }

  public _onSuccess(): void {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = true;
    this.isCancel = false;
    this.isError = false;
    this.progress = 100;
  }

  public _onError(): void {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = true;
    this.progress = 0;
  }

  public _onCancel(): void {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = true;
    this.isError = false;
    this.progress = 0;
  }

  public _onComplete(): void {
  }

  public _prepareToUploading(): void {
    this.isReady = true;
  }
}
