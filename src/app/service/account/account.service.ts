import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {APP_CONFIG} from '../../app.config.constants';
import {IAppConfig} from '../../app.config.interface';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

@Injectable()
export class AccountService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  public register(email: string, password: string): Observable<boolean> {
    return this.http.post(this.config.loginEndpoint + '/register', {
      email: email,
      password: password
    }, {
      params: new HttpParams().set('type', 'email'),
    })
      .do(data => console.log(data), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'))
      .map(data => {
        return true;
      });
  }

  public resendRegisterEmail(email: string): Observable<boolean> {
    return this.http.get(this.config.loginEndpoint + '/resendVerifiedEmail', {
      params: new HttpParams().set('email', email),
    })
      .do(data => console.log(data), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'))
      .map(data => {
        return true;
      });
  }

  public confirmEmail(email: string, token: string, lang: string): Observable<boolean> {
    return this.http.get(this.config.loginEndpoint + '/email/registrationConfirm', {
      params: new HttpParams().set('email', email).set('token', token).set('lang', lang),
    })
      .do(data => console.log(data), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'))
      .map(data => {
        return true;
      });
  }
}
