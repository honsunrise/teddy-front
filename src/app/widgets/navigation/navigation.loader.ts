import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

export abstract class NavigationLoader {
  abstract getItems(): Observable<any>;
}

/**
 * This loader is just a placeholder that does nothing, in case you don't need a loader at all
 */
@Injectable()
export class NavigationFakeLoader extends NavigationLoader {
  getItems(): Observable<any> {
    return Observable.of([]);
  }
}
