import { InjectionToken } from '@angular/core';
import { IAppConfig } from './app.config.interface';

export const APP_DI_CONFIG: IAppConfig = {
  loginEndpoint: 'http://127.0.0.1:8080',
  contentEndpoint: 'http://127.0.0.1:8081',
  uploadEndpoint: 'http://127.0.0.1:8085',
  requestRetry: 1,
  uploadRetry: 1,
  uploadChunkRetry: 3
};

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
