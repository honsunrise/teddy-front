import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {APP_CONFIG} from '../../app.config.constants';
import {IAppConfig} from '../../app.config.interface';
import {HttpClient, HttpEvent, HttpEventType, HttpParams} from '@angular/common/http';
import {UploadToken} from '../domain/uploadToken';
import {NextChunk} from '../domain/nextChunk';
import {FileUploader} from './file-uploader.class';
import {Observer} from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class UploadService {

  private requestUploadToken = (file: File): Observable<any> => {
    return this.http.get<UploadToken>(this.config.uploadEndpoint + '/base/upload', {
      params: new HttpParams().set('name', file.name).set('filesize', file.size + ''),
      withCredentials: true
    }).retry(this.config.requestRetry);
  };

  private uploadFile = (token: UploadToken, file: File): Observable<HttpEvent<any>> => {
    return new Observable((observer: Observer<HttpEvent<any>>) => {
      let subscription: Subscription = null;
      let continueUpload = true;
      const uploadNextChunk = (start: number, end: number, left: number) => {
        if (continueUpload) {
          subscription = null;
          if (left === 0) {
            observer.complete();
            return;
          }
          const currentBlob = file.slice(start, end);
          subscription = this.uploadFileChunk(token.token, file.name, currentBlob)
            .subscribe((event: HttpEvent<NextChunk>) => {
              switch (event.type) {
                case HttpEventType.Response:
                  const ret = event.body;
                  uploadNextChunk(ret.start, ret.end, ret.left);
                  break;
                case HttpEventType.UploadProgress:
                  event.loaded = file.size - left;
                  event.total = file.size;
                  break;
              }
              observer.next(event);
            }, error => observer.error(error));
        }
      };

      uploadNextChunk(token.start, token.end, token.left);

      return () => {
        continueUpload = false;
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    });
  };

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

    return this.http.post<NextChunk>(this.config.uploadEndpoint + '/base/upload', form,
      {
        observe: 'events',
        responseType: 'json',
        withCredentials: true,
        reportProgress: true
      }).retry(this.config.uploadChunkRetry);
  }
}
