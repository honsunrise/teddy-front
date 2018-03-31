import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG} from '../../app.config.constants';
import {IAppConfig} from '../../app.config.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MessageService {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig, private http: HttpClient) {
  }

}
