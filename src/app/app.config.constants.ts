import {InjectionToken} from '@angular/core';
import {IAppConfig} from './app.config.interface';

export const APP_DI_CONFIG: IAppConfig = {
  loginEndpoint: 'http://69.30.199.90:8080',
  contentEndpoint: 'http://69.30.199.90:8081',
  uploadEndpoint: 'http://69.30.199.90:8085',
  requestRetry: 1,
  uploadRetry: 1,
  uploadChunkRetry: 3
};

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
