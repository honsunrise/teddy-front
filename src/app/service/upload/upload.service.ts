import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG } from '../../app.config.constants';
import { IAppConfig } from '../../app.config.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { UploadToken } from '../domain/uploadToken';
import { Subscriber } from 'rxjs/Subscriber';
import { NextChunk } from '../domain/nextChunk';

@Injectable()
export class UploadService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public requestUploadToken(name: string, filesize: number): Observable<UploadToken> {
    return this.http.get<UploadToken>(this.config.uploadEndpoint, {
      params: new HttpParams().set('name', name).set('filesize', filesize + ''),
    })
      .do(data => console.log(data), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'));
  }

  public uploadFileChunk(token: string, name: string, data: Blob): Observable<NextChunk> {
    const form = new FormData();
    form.append('token', token);
    form.append('file', data, name);
    return this.http.post(this.config.uploadEndpoint, form,
      {
        withCredentials: true
      })
      .do(value => console.log(value), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'));
  }

  public uploadFileAll(file: File, retry: number): Observable<boolean> {
    let leftRetry = retry;
    return Observable.create((subscriber: Subscriber<boolean>) => {
      const uploadNextChunk = (token: string, start: number, end: number, left: number) => {
        if (left === 0) {
          subscriber.next(true);
          subscriber.complete();
          return;
        }
        const currentBlob = file.slice(start, end);
        this.uploadFileChunk(token, file.name, currentBlob).subscribe((ret) => {
          leftRetry = retry;
          uploadNextChunk(token, ret.start, ret.end, ret.left);
        }, error => {
          if (!leftRetry) {
            return;
          }
          leftRetry--;
          uploadNextChunk(token, start, end, left);
        });
      };
      this.requestUploadToken(file.name, file.size).subscribe((uploadToken: UploadToken) => {
        uploadNextChunk(uploadToken.token, uploadToken.start, uploadToken.end, uploadToken.left);
      });
    });
  }
}
