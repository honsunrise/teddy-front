import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../app.config.constants';
import { IAppConfig } from '../app.config.interface';

@Injectable()
export class AuthService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  private _redirectUrl: string;
  private isLogin = false;

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.config.loginEndpoint + 'login', {username: username, password: password})
      .map(value => {
        return true;
      });
  }

  logout(): void {
  }

  checkLogin(url: string): boolean {
    if (this.isLogin) {
      return true;
    }
    this._redirectUrl = url;
    return false;
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }
}
