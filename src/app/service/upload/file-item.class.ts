import {Observable} from 'rxjs/Rx';
import {Subscription} from 'rxjs/Subscription';

export class FileSplit {
  public data: Blob;
}

export interface FileIntmOptions {
  formatDataFunction?: (file: Blob) => Observable<Blob> | Promise<Blob> | Blob;
}

export class FileItem {
  public file: File;
  // state
  public isUploading = false;
  public isSuccess = false;
  public isError = false;
  public isCancel = false;
  public progress = 0;
  public subscription: Subscription;

  constructor(file: File) {
    this.file = file;
  }

  public _onBeforeUpload(): void {
    this.isUploading = true;
    this.isSuccess = false;
    this.isError = false;
    this.progress = 0;
  }

  public _onProgress(progress: number): void {
    this.progress = progress;
  }

  public _onSuccess(): void {
    this.isUploading = false;
    this.isSuccess = true;
    this.isError = false;
    this.progress = 100;
  }

  public _onError(): void {
    this.isUploading = false;
    this.isSuccess = false;
    this.isError = true;
    this.progress = 0;
  }

  public _onCancel(): void {
    this.isUploading = false;
    this.isSuccess = false;
    this.isError = false;
    this.progress = 0;
  }
}
