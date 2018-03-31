import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {APP_CONFIG} from '../../app.config.constants';
import {IAppConfig} from '../../app.config.interface';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {UserProfile} from '../domain/userprofile';

@Injectable()
export class UserService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public getUserProfile(uid?: string): Observable<UserProfile> {
    let options = {};
    if (uid != null) {
      options = {
        params: new HttpParams().set('uid', uid)
      };
    }
    return this.http.get<UserProfile>(this.config.uploadEndpoint + '/base/getUserDetail', options)
      .do(data => console.log(data), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'));
  }

  public updateUserProfile(data: any): Observable<string> {
    const response: Observable<string> = this.http.put(this.config.uploadEndpoint + '/base/updateUserProfile', data,
      {
        observe: 'body',
        responseType: 'text',
        withCredentials: true
      });
    return response
      .do(value => console.log(value), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'));
  }
}
