import {NavigationLoader} from './widgets/navigation/navigation.loader';
import {Observable} from 'rxjs/Rx';
import {AuthService} from './auth/auth.service';

export class AuthNavigationLoader implements NavigationLoader {

  constructor(private authService: AuthService) {
  }

  getItems(): Observable<any> {
    if (this.authService.checkLogin()) {
      return Observable.of([
        {
          'id': 'home',
          'title': 'Home',
          'type': 'item',
          'icon': 'home',
          'url': '/home'
        },
        {
          'id': 'cate',
          'title': 'Cate',
          'type': 'item',
          'icon': 'code',
          'url': '/cate'
        },
        {
          'id': 'media_library',
          'title': 'Media Library',
          'type': 'group',
          'children': [
            {
              'id': 'later',
              'title': 'Watch Later',
              'type': 'item',
              'icon': 'history',
              'url': '/playlist/later'
            },
            {
              'id': 'favorite',
              'title': 'Favorite',
              'type': 'item',
              'icon': 'favorite',
              'url': '/playlist/favorite'
            },
          ]
        }
      ]);
    } else {
      return Observable.of([
        {
          'id': 'home',
          'title': 'Home',
          'type': 'item',
          'icon': 'home',
          'url': '/home'
        },
        {
          'id': 'cate',
          'title': 'Cate',
          'type': 'item',
          'icon': 'code',
          'url': '/cate'
        }
      ]);
    }
  }
}
