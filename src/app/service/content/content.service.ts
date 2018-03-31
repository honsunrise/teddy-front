import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config.constants';
import {IAppConfig} from '../../app.config.interface';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Info} from '../domain/info';
import {Observable} from 'rxjs/Rx';
import {InfoWithTime} from '../domain/InfoWithTime';
import {UserProfile} from '../domain/userprofile';
import {Tag} from '../domain/tag';

@Injectable()
export class ContentService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

  getAllTags(page: number, size: number): Observable<Tag[]> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<Array<Tag>>(this.config.contentEndpoint + '/info/tags', {
      params: params,
    });
  }

  getInfoList(page: number, size: number, tags?: string[], uid?: string): Observable<Array<Info>> {
    let params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    if (uid != null) {
      params = params.set('uid', uid);
    }
    if (tags != null) {
      tags.forEach(value => {
        params = params.append('tags', value);
      });
    }
    return this.http.get<Array<Info>>(this.config.contentEndpoint + '/info/all', {
      params: params,
    });
  }

  getInfoDetail(infoId: string): Observable<Info> {
    return this.http.get<Info>(this.config.contentEndpoint + '/info/' + infoId);
  }

  publishInfo(title: string, content: string, images: string[], movie: string,
              external: boolean, canReview: boolean, tags: string[]): Observable<boolean> {
    const response: Observable<string> = this.http.post(this.config.contentEndpoint + '/info/publish',
      {
        title: title,
        content: content,
        imageList: images,
        movie: movie,
        external: external,
        canReview: canReview,
        tags: tags,
        location: {
          alt: 0,
          lat: 0,
          lon: 0
        }
      }, {
        observe: 'body',
        responseType: 'text',
        withCredentials: true
      });
    return response.do(data => console.log(data), (err: HttpErrorResponse) => {
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

  watchInfo(infoId: string): Observable<boolean> {
    const response: Observable<string> = this.http.post(this.config.contentEndpoint + '/info/' + infoId + '/watch',
      {}, {
        observe: 'body',
        responseType: 'text',
        withCredentials: true
      });
    return response.do(data => console.log(data), (err: HttpErrorResponse) => {
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

  favoriteInfo(infoId: string, cancel: boolean): Observable<boolean> {
    let response: Observable<string>;
    if (cancel) {
      response = this.http.delete(this.config.contentEndpoint + '/info/' + infoId + '/favorite',
        {
          observe: 'body',
          responseType: 'text',
          withCredentials: true
        });
    } else {
      response = this.http.post(this.config.contentEndpoint + '/info/' + infoId + '/favorite', {},
        {
          observe: 'body',
          responseType: 'text',
          withCredentials: true
        });
    }
    return response
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

  getInfoFavoriteUserList(infoId: string, page: number, size: number): Observable<Array<UserProfile>> {
    const params = new HttpParams()
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    return this.http.get<Array<UserProfile>>(this.config.contentEndpoint + '/info/' + infoId + '/favorite', {
      params: params,
      withCredentials: true
    });
  }

  getUserFavoriteList(page = 0, size = 10, uid?: string): Observable<Array<InfoWithTime>> {
    let params = new HttpParams()
      .set('type', 'favorite')
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    if (uid) {
      params = params.set('uid', uid);
    }
    return this.http.get<Array<InfoWithTime>>(this.config.contentEndpoint + '/info/user', {
      params: params,
      withCredentials: true
    });
  }

  thumbUpInfo(infoId: string, cancel: boolean): Observable<boolean> {
    let ret: Observable<string>;
    if (cancel) {
      ret = this.http.delete(this.config.contentEndpoint + '/info/' + infoId + '/thumbUp',
        {
          observe: 'body',
          responseType: 'text',
          withCredentials: true
        });
    } else {
      ret = this.http.post(this.config.contentEndpoint + '/info/' + infoId + '/thumbUp', null,
        {
          observe: 'body',
          responseType: 'text',
          withCredentials: true
        });
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

  getUserThumbUpList(page = 0, size = 10, uid?: string): Observable<Array<InfoWithTime>> {
    let params = new HttpParams()
      .set('type', 'thumbUp')
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    if (uid) {
      params = params.set('uid', uid);
    }
    return this.http.get<Array<InfoWithTime>>(this.config.contentEndpoint + '/info/user', {
      params: params,
      withCredentials: true
    });
  }

  thumbDownInfo(infoId: string, cancel: boolean): Observable<boolean> {
    let ret: Observable<string>;
    if (cancel) {
      ret = this.http.delete(this.config.contentEndpoint + '/info/' + infoId + '/thumbDown',
        {
          observe: 'body',
          responseType: 'text',
          withCredentials: true
        });
    } else {
      ret = this.http.post(this.config.contentEndpoint + '/info/' + infoId + '/thumbDown', null,
        {
          observe: 'body',
          responseType: 'text',
          withCredentials: true
        });
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

  getUserThumbDownList(page = 0, size = 10, uid?: string): Observable<Array<InfoWithTime>> {
    let params = new HttpParams()
      .set('type', 'thumbDown')
      .set('page', page.toString(10))
      .set('size', size.toString(10));
    if (uid) {
      params = params.set('uid', uid);
    }
    return this.http.get<Array<InfoWithTime>>(this.config.contentEndpoint + '/info/user', {
      params: params,
      withCredentials: true
    });
  }
}
