import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor() { }

  private redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
    return Observable.of(true).delay(1000);
  }

  logout(): void {
  }

  checkLogin(url: string): boolean {
    if (tokenNotExpired()) { return true; }
    this.redirectUrl = url;
    return false;
  }
}
