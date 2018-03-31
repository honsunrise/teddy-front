import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EmbedVideoService {
  private validYouTubeOptions = [
    'default',
    'mqdefault',
    'hqdefault',
    'sddefault',
    'maxresdefault'
  ];
  private validVimeoOptions = [
    'thumbnail_small',
    'thumbnail_medium',
    'thumbnail_large'
  ];
  private validDailyMotionOptions = [
    'thumbnail_60_url',
    'thumbnail_120_url',
    'thumbnail_180_url',
    'thumbnail_240_url',
    'thumbnail_360_url',
    'thumbnail_480_url',
    'thumbnail_720_url',
    'thumbnail_1080_url'
  ];

  constructor(private http: HttpClient) {
  }

  public embed(url: any, options?: any): any {
    let id;
    url = new URL(url);

    id = this.detectAvtb(url);
    if (id) {
      return this.embed_avtb(id, options);
    }

    id = this.detectXVideo(url);
    if (id) {
      return this.embed_xvideo(id, options);
    }

    id = this.detectYoutube(url);
    if (id) {
      return this.embed_youtube(id, options);
    }

    id = this.detectVimeo(url);
    if (id) {
      return this.embed_vimeo(id, options);
    }

    id = this.detectDailymotion(url);
    if (id) {
      return this.embed_dailymotion(id, options);
    }
  }

  public embed_xvideo(id: string, options?: any): string {
    options = this.parseOptions(options);
    let queryString;

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    return '//flashservice.xvideos.com/embedframe/' + id + options.query;
  }

  public embed_avtb(id: string, options?: any): string {
    options = this.parseOptions(options);
    let queryString;

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    return '//www.avtb004.com/embed/' + id + options.query;
  }

  public embed_youtube(id: string, options?: any): string {
    options = this.parseOptions(options);
    let queryString;

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    return '//www.youtube.com/embed/' + id + options.query;
  }

  public embed_vimeo(id: string, options?: any): string {
    options = this.parseOptions(options);
    let queryString;

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    return '//player.vimeo.com/video/' + id + options.query;
  }

  public embed_dailymotion(id: string, options?: any): string {
    options = this.parseOptions(options);
    let queryString;

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    return '//www.dailymotion.com/embed/video/' + id + options.query;
  }

  public embed_image(url: any, options?: any): any {
    let id;

    url = new URL(url);

    id = this.detectYoutube(url);
    if (id) {
      return this.embed_youtube_image(id, options);
    }

    id = this.detectVimeo(url);
    if (id) {
      return this.embed_vimeo_image(id, options);
    }

    id = this.detectDailymotion(url);
    if (id) {
      return this.embed_dailymotion_image(id, options);
    }
  }

  private embed_youtube_image(id: string, options?: any): any {
    if (typeof options === 'function') {
      options = {};
    }
    options = options || {};

    options.image = this.validYouTubeOptions.indexOf(options.image) > 0 ? options.image : 'default';

    const src = '//img.youtube.com/vi/' + id + '/' + options.image + '.jpg';

    const result = {
      link: src,
      html: '<img src="' + src + '"/>'
    };

    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }

  private embed_vimeo_image(id: string, options?: any): any {
    if (typeof options === 'function') {
      options = {};
    }

    options = options || {};

    options.image = this.validVimeoOptions.indexOf(options.image) >= 0 ? options.image : 'thumbnail_large';

    return this.http.get('https://vimeo.com/api/v2/video/' + id + '.json')
      .map(res => {
        return {
          'link': res[0][options.image],
          'html': '<img src="' + res[0][options.image] + '"/>'
        };
      })
      .toPromise()
      .catch(error => console.log(error));
  }

  private embed_dailymotion_image(id: string, options?: any): any {
    if (typeof options === 'function') {
      options = {};
    }

    options = options || {};

    options.image = this.validDailyMotionOptions.indexOf(options.image) >= 0 ? options.image : 'thumbnail_480_url';

    return this.http.get('https://api.dailymotion.com/video/' + id + '?fields=' + options.image)
      .map(res => {
        return {
          'link': res[options.image],
          'html': '<img src="' + res[options.image] + '"/>'
        };
      })
      .toPromise()
      .catch(error => console.log(error));
  }

  private parseOptions(options: any): any {
    let queryString = '',
      attributes = '';

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    if (options && options.hasOwnProperty('attr')) {
      const temp = <any>[];

      Object.keys(options.attr).forEach(function (key) {
        temp.push(key + '="' + (options.attr[key]) + '"');
      });

      attributes = ' ' + temp.join(' ');
    }
    return {
      query: queryString,
      attr: attributes
    };
  }

  private serializeQuery(query: any): any {
    const queryString = [];

    for (const p in query) {
      if (query.hasOwnProperty(p)) {
        queryString.push(encodeURIComponent(p) + '=' + encodeURIComponent(query[p]));
      }
    }

    return queryString.join('&');
  }

  private detectVimeo(url: any): string {
    return (url.hostname === 'vimeo.com') ? url.pathname.split('/')[1] : null;
  }

  private detectYoutube(url: any): string {
    if (url.hostname.indexOf('youtube.com') > -1) {
      return url.search.split('=')[1];
    }

    if (url.hostname === 'youtu.be') {
      return url.pathname.split('/')[1];
    }

    return null;
  }

  private detectAvtb(url: any): string {
    if (url.hostname.indexOf('avtb004.com') > -1) {
      return url.pathname.split('/')[1];
    }

    return null;
  }

  private detectXVideo(url: any): string {
    if (url.hostname.indexOf('xvideos.com') > -1) {
      const str = url.pathname.split('/')[1];
      return str.substr(5, str.length - 5);
    }

    return null;
  }

  private detectDailymotion(url: any): string {
    if (url.hostname.indexOf('dailymotion.com') > -1) {
      return url.pathname.split('/')[2].split('_')[0];
    }

    if (url.hostname === 'dai.ly') {
      return url.pathname.split('/')[1];
    }

    return null;
  }
}
