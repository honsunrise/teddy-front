import { InjectionToken } from '@angular/core';
import { IAppConfig } from './app.config.interface';

export const APP_DI_CONFIG: IAppConfig = {
  loginEndpoint: 'http://localhost:8080/',
  contentEndpoint: 'http://localhost:8081/'
};

export let APP_CONFIG = new InjectionToken<IAppConfig>('app.config');
