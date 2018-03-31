import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class NavigationService {
  onNavCollapseToggled = new EventEmitter<any>();

  constructor() {
  }
}
