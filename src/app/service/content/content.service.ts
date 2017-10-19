import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../app.config.constants';
import { IAppConfig } from '../../app.config.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Info } from '../domain/info';
import { Observable } from 'rxjs/Observable';
import { InfoWithTime } from '../domain/InfoWithTime';
import { UserProfile } from '../domain/userprofile';

@Injectable()
export class ContentService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getInfoList(page: number, size: number, uid?: string): Observable<Array<Info>> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    if (uid != null) {
      params.set('uid', uid);
    }
    return this.http.get<Array<Info>>(this.config.contentEndpoint + '/info/all', {
      params: params,
    });
  }

  getInfoDetail(infoId: string): Observable<Info> {
    return this.http.get<Info>(this.config.contentEndpoint + '/info/' + infoId);
  }

  publishInfo(title: string, content: string, images: Array<string>, movie: string,
              external: boolean, canReview: boolean): Observable<boolean> {
    return this.http.post(this.config.contentEndpoint + '/info/publish', {
      title: title,
      content: content,
      images: images,
      movie: movie,
      external: external,
      canReview: canReview,
      location: {
        alt: 0,
        lat: 0,
        lon: 0
      }
    }, {withCredentials: true}).do(data => console.log(data), (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('An error occurred:', err.error.message);
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    }, () => console.log('Complete'))
      .map(data => {
        console.log(data);
        return true;
      });
  }

  watchInfo(infoId: string): Observable<boolean> {
    return this.http.post(this.config.contentEndpoint + '/info/' + infoId + '/watch', {},
      {withCredentials: true}).do(data => console.log(data), (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('An error occurred:', err.error.message);
      } else {
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    }, () => console.log('Complete'))
      .map(data => {
        console.log(data);
        return true;
      });
  }

  favoriteInfo(infoId: string, cancel: boolean): Observable<boolean> {
    let ret;
    if (cancel) {
      ret = this.http.delete(this.config.contentEndpoint + '/info/' + infoId + '/favorite',
        {withCredentials: true});
    } else {
      ret = this.http.post(this.config.contentEndpoint + '/info/' + infoId + '/favorite', {},
        {withCredentials: true});
    }
    return ret
      .do(data => console.log(data), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'))
      .map(data => {
        console.log(data);
        return true;
      });
  }

  getInfoFavoriteUserList(infoId: string, page: number, size: number): Observable<Array<UserProfile>> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<Array<UserProfile>>(this.config.contentEndpoint + '/info/' + infoId + '/favorite', {
      params: params,
      withCredentials: true
    });
  }

  getUserFavoriteList(uid: string, page: number, size: number): Observable<Array<InfoWithTime>> {
    const params = new HttpParams()
      .set('type', 'favorite')
      .set('uid', uid)
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<Array<InfoWithTime>>(this.config.contentEndpoint + '/info/user', {
      params: params,
      withCredentials: true
    });
  }

  thumbUpInfo(infoId: string, cancel: boolean): Observable<boolean> {
    let ret;
    if (cancel) {
      ret = this.http.delete(this.config.contentEndpoint + '/info/' + infoId + '/thumbUp',
        {withCredentials: true});
    } else {
      ret = this.http.post(this.config.contentEndpoint + '/info/' + infoId + '/thumbUp', null,
        {withCredentials: true});
    }

    return ret
      .do(data => console.log(data), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'))
      .map(data => {
        console.log(data);
        return true;
      });
  }

  getInfoThumbUpUserList(infoId: string, page: number, size: number): Observable<Array<UserProfile>> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<Array<UserProfile>>(this.config.contentEndpoint + '/info/' + infoId + '/thumbUp', {
      params: params,
      withCredentials: true
    });
  }

  getUserThumbUpList(uid: string, page: number, size: number): Observable<Array<InfoWithTime>> {
    const params = new HttpParams()
      .set('type', 'thumbUp')
      .set('uid', uid)
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<Array<InfoWithTime>>(this.config.contentEndpoint + '/info/user', {
      params: params,
      withCredentials: true
    });
  }

  thumbDownInfo(infoId: string, cancel: boolean): Observable<boolean> {
    let ret;
    if (cancel) {
      ret = this.http.delete(this.config.contentEndpoint + '/info/' + infoId + '/thumbDown',
        {withCredentials: true});
    } else {
      ret = this.http.post(this.config.contentEndpoint + '/info/' + infoId + '/thumbDown', null,
        {withCredentials: true});
    }

    return ret
      .do(data => console.log(data), (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }, () => console.log('Complete'))
      .map(data => {
        console.log(data);
        return true;
      });
  }

  getInfoThumbDownUserList(infoId: string, page: number, size: number): Observable<Array<UserProfile>> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<Array<UserProfile>>(this.config.contentEndpoint + '/info/' + infoId + '/thumbDown', {
      params: params,
      withCredentials: true
    });
  }

  getUserThumbDownList(uid: string, page: number, size: number): Observable<Array<InfoWithTime>> {
    const params = new HttpParams()
      .set('type', 'thumbDown')
      .set('uid', uid)
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<Array<InfoWithTime>>(this.config.contentEndpoint + '/info/user', {
      params: params,
      withCredentials: true
    });
  }
}
