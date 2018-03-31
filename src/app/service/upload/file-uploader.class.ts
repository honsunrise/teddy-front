import {FileIntmOptions, FileItem} from './file-item.class';
import {FileType} from './file-type.class';
import {Observable} from 'rxjs/Rx';
import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {Observer} from 'rxjs/Observer';

export enum UploadEventType {
  /**
   * The request was sent out over the wire.
   */
  Sent = 0,
  /**
   * An upload progress event was received.
   */
  UploadProgress = 1,
  /**
   * The response status code and headers were received.
   */
  ResponseHeader = 2,
  /**
   * A download progress event was received.
   */
  DownloadProgress = 3,
  /**
   * The full response including the body was received.
   */
  Response = 4,
  /**
   * A custom event from an interceptor or a backend.
   */
  User = 5,
}

export class UploadEvent {
  type: UploadEventType;
}

export interface FilterFunction {
  name: string;
  fn: (item?: File, options?: FileUploaderOptions) => boolean;
}

export interface FileUploaderOptions {
  allowedMimeType?: string[];
  allowedFileType?: string[];
  autoUpload?: boolean;
  filters?: FilterFunction[];
  maxFileSize?: number;
  queueLimit?: number;
  removeAfterUpload?: boolean;
  formatDataFunction?: (file: Blob) => Observable<Blob> | Promise<Blob> | Blob;
}

export class FileUploader {
  public isUploading = false;
  public queue: FileItem[] = [];
  public progress = 0;
  public autoUpload: any;

  public options: FileUploaderOptions = {
    autoUpload: false,
    filters: [],
    removeAfterUpload: false,
    formatDataFunction: (item: File) => item,
  };

  public constructor(private request: (File) => Observable<any>,
                     private upload: (token: any, file: File) => Observable<HttpEvent<any>>,
                     options: FileUploaderOptions) {
    this.setOptions(options);
  }

  public setOptions(options: FileUploaderOptions): void {
    this.options = Object.assign(this.options, options);
    this.autoUpload = options.autoUpload;

    this.options.filters.unshift({name: 'queueLimit', fn: this._queueLimitFilter});

    if (this.options.maxFileSize) {
      this.options.filters.unshift({name: 'fileSize', fn: this._fileSizeFilter});
    }

    if (this.options.allowedFileType) {
      this.options.filters.unshift({name: 'fileType', fn: this._fileTypeFilter});
    }

    if (this.options.allowedMimeType) {
      this.options.filters.unshift({name: 'mimeType', fn: this._mimeTypeFilter});
    }
  }

  public addToQueue(files: File[], options?: FileIntmOptions): void {
    const addedFileItems: FileItem[] = [];
    const failedFileItems: File[] = [];
    files.forEach((file: File) => {
      const valid = this._isValidFile(file);
      if (valid.success) {
        const fileItem = new FileItem(file);
        addedFileItems.push(fileItem);
        this.queue.push(fileItem);
        this._onAfterAddingFile(fileItem);
      } else {
        failedFileItems.push(file);
        const filter = valid.failFilter;
        this._onWhenAddingFileFailed(file, filter, options);
      }
    });
    this._onAfterAddingComplete(addedFileItems, failedFileItems);
    this.progress = this._getTotalProgress();
    if (this.options.autoUpload) {
      this.uploadAll();
    }
  }

  public removeFromQueue(value: FileItem): void {
    const index = this.getIndexOfItem(value);
    const item = this.queue[index];
    if (item.isUploading) {
      this.cancelItem(item);
    }
    this.queue.splice(index, 1);
    this.progress = this._getTotalProgress();
  }

  public clearQueue(): void {
    while (this.queue.length) {
      this.removeFromQueue(this.queue[0]);
    }
    this.progress = 0;
  }

  public uploadItem(value: FileItem): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const index = this.getIndexOfItem(value);
      const item = this.queue[index];
      this._onBeforeUploadItem(item);
      if (this.isUploading) {
        return;
      }
      this.isUploading = true;
      item.subscription = this.request(item.file)
        .subscribe((data) => {
          item.subscription = this.upload(data, item.file)
            .subscribe((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.UploadProgress:
                  const percentDone = Math.round(100 * event.loaded / event.total);
                  this._onProgressItem(item, percentDone);
                  break;
              }
            }, (err: HttpErrorResponse) => {
              this._onErrorItem(item, err);
              this.isUploading = false;
              observer.error(err);
            }, () => {
              this._onSuccessItem(item);
              this.isUploading = false;
              observer.next(data);
              observer.complete();
            });
        }, err => observer.error(err));
    });
  }

  public cancelItem(value: FileItem): void {
    const index = this.getIndexOfItem(value);
    const item = this.queue[index];
    if (item && item.isUploading) {
      item.isCancel = true;
      item.subscription.unsubscribe();
      this._tryCancelItem(item);
    }
  }

  public uploadAll(): Observable<any> {
    const items = this.getNotUploadedItems().filter((item: FileItem) => !item.isUploading);
    if (!items.length) {
      return;
    }
    const retArray = [];
    return new Observable((observe: Observer<any[]>) => {
      const uploadNext = (item) => {
        this.uploadItem(item)
          .subscribe((data) => {
            retArray.push(data);
            const nextItem = this.getNotUploadedItems()[0];
            if (nextItem) {
              uploadNext(nextItem);
              return;
            }
            this.onCompleteAll();
            this.progress = this._getTotalProgress();
            observe.next(retArray);
            observe.complete();
          }, error => observe.error(error));
      };
      uploadNext(items[0]);
    });
  }

  public cancelAll(): void {
    const items = this.getNotUploadedItems();
    items.forEach((item: FileItem) => this.cancelItem(item));
  }

  public getIndexOfItem(value: FileItem): number {
    return this.queue.indexOf(value);
  }

  public getNotUploadedItems(): any[] {
    return this.queue.filter((item: FileItem) => !item.isSuccess && !item.isError && !item.isCancel);
  }

  public onAfterAddingAll(success: FileItem[], failed: File[]): any {
    return {success, failed};
  }

  public onAfterAddingFile(fileItem: FileItem): any {
    return {fileItem};
  }

  public onAddingFileFailed(item: File, filter: any, options: any): any {
    return {item, filter, options};
  }

  public onBeforeUploadItem(fileItem: FileItem): any {
    return {fileItem};
  }

  public onProgressItem(fileItem: FileItem, progress: any): any {
    return {fileItem, progress};
  }

  public onProgressAll(progress: any): any {
    return {progress};
  }

  public onSuccessItem(item: FileItem): any {
    return {item};
  }

  public onErrorItem(item: FileItem, response: HttpErrorResponse): any {
    return {item, response};
  }

  public onCancelItem(item: FileItem): any {
    return {item};
  }

  public onCompleteItem(item: FileItem): any {
    return {item};
  }

  public onCompleteAll(): any {
    return void 0;
  }

  private _tryCancelItem(item: FileItem) {
    if (!item.isSuccess && !item.isError && item.isUploading && item.isCancel) {
      this.isUploading = false;
      this._onCancelItem(item);
    }
  }

  private _getTotalProgress(value: number = 0): number {
    if (this.options.removeAfterUpload) {
      return value;
    }
    const notUploaded = this.getNotUploadedItems().length;
    const uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
    const ratio = 100 / this.queue.length;
    const current = value * ratio / 100;
    return Math.round(uploaded * ratio + current);
  }

  private _mimeTypeFilter(item: File): boolean {
    return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
  }

  private _fileSizeFilter(item: File): boolean {
    return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
  }

  private _fileTypeFilter(item: File): boolean {
    return !(this.options.allowedFileType &&
      this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
  }

  private _queueLimitFilter(): boolean {
    return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
  }

  private _isValidFile(file: File): { success, failFilter } {
    if (!this.options.filters.length) {
      return {success: true, failFilter: null};
    } else {
      for (const filter of this.options.filters) {
        if (!filter.fn.call(this, file, this.options)) {
          return {success: false, failFilter: filter};
        }
      }
      return {success: true, failFilter: null};
    }
  }

  private _onAfterAddingFile(item: FileItem): void {
    this.onAfterAddingFile(item);
  }

  private _onAfterAddingComplete(success: FileItem[], failed: File[]): void {
    this.onAfterAddingAll(success, failed);
  }

  private _onBeforeUploadItem(item: FileItem): void {
    item._onBeforeUpload();
    this.onBeforeUploadItem(item);
  }

  private _onWhenAddingFileFailed(item: File, filter: any, options: any): void {
    this.onAddingFileFailed(item, filter, options);
  }

  private _onProgressItem(item: FileItem, progress: any): void {
    const total = this._getTotalProgress(progress);
    this.progress = total;
    item._onProgress(progress);
    this.onProgressItem(item, progress);
    this.onProgressAll(total);
  }

  private _onSuccessItem(item: FileItem): void {
    item._onSuccess();
    this.onSuccessItem(item);
    this.onCompleteItem(item);
  }

  private _onErrorItem(item: FileItem, response: HttpErrorResponse): void {
    item._onError();
    this.onErrorItem(item, response);
    this.onCompleteItem(item);
  }

  private _onCancelItem(item: FileItem): void {
    item._onCancel();
    this.onCancelItem(item);
    this.onCompleteItem(item);
  }
}
