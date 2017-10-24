import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from '../../app.config.constants';
import { IAppConfig } from '../../app.config.interface';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { UploadToken } from '../domain/uploadToken';
import { NextChunk } from '../domain/nextChunk';
import { FileUploader } from './file-uploader.class';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class UploadService {

  private requestUploadToken = (file: File): Observable<any> => {
    return this.http.get<UploadToken>(this.config.uploadEndpoint + '/base/upload', {
      params: new HttpParams().set('name', file.name).set('filesize', file.size + ''),
      withCredentials: true
    })
      .do(data => console.log(data), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'));
  }

  private uploadFile = (token: UploadToken, file: File): Observable<HttpEvent<any>> => {
    return Observable.create((observer: Observer<HttpEvent<any>>) => {
      const uploadNextChunk = (start: number, end: number, left: number) => {
        if (left === 0) {
          observer.complete();
          return;
        }
        const currentBlob = file.slice(start, end);
        this.uploadFileChunk(token.token, file.name, currentBlob)
          .subscribe((event: HttpEvent<NextChunk>) => {
            observer.next(event);
            switch (event.type) {
              case HttpEventType.Response:
                const ret = event.body;
                uploadNextChunk(ret.start, ret.end, ret.left);
            }
          }, error => observer.error(error));
      };

      uploadNextChunk(token.start, token.end, token.left);
    });
  }

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public getFileUploader(): FileUploader {
    const fileUploader = new FileUploader(this.requestUploadToken, this.uploadFile, {});
    return fileUploader;
  }

  private uploadFileChunk(token: string, name: string, data: Blob): Observable<HttpEvent<NextChunk>> {
    const form = new FormData();
    form.append('token', token);
    form.append('file', data, name);

    return this.http.post(this.config.uploadEndpoint + '/base/upload', form,
      {
        observe: 'events',
        responseType: 'json',
        withCredentials: true,
        reportProgress: true
      }).retry(this.config.uploadChunkRetry)
      .do(value => console.log(value), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'));
  }
}
