import { NavigationLoader } from './widgets/navigation/navigation.loader';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';

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
              'id': 'thumb',
              'title': 'Thumb Up',
              'type': 'item',
              'icon': 'thumb_up',
              'url': '/playlist/thumbUp'
            },
            {
              'id': 'collapse',
              'title': 'Collapse',
              'type': 'collapse',
              'icon': 'email',
              'children': [
                {
                  'id': 'test',
                  'title': 'Test',
                  'type': 'item',
                  'icon': 'email',
                  'url': '/blank',
                  'badge': {
                    'num': 25,
                    'bg': '#F44336',
                    'fg': '#FFFFFF'
                  }
                }
              ]
            },
            {
              'id': 'collapse',
              'title': 'Collapse',
              'type': 'collapse',
              'icon': 'email',
              'children': [
                {
                  'id': 'test',
                  'title': 'Test',
                  'type': 'item',
                  'icon': 'email',
                  'url': '/profile',
                  'badge': {
                    'num': 25,
                    'bg': '#F44336',
                    'fg': '#FFFFFF'
                  }
                }
              ]
            },
          ]
        }
      ]);
    } else {
      return Observable.of([
        {
          'id': 'applications',
          'title': 'Applications',
          'type': 'group',
          'children': [
            {
              'id': 'sample',
              'title': 'Sample',
              'type': 'item',
              'icon': 'email',
              'url': '/cate',
              'badge': {
                'num': 25,
                'bg': '#F44336',
                'fg': '#FFFFFF'
              }
            },
            {
              'id': 'collapse',
              'title': 'Collapse',
              'type': 'collapse',
              'children': [
                {
                  'id': 'test',
                  'title': 'Test',
                  'type': 'item',
                  'icon': 'email',
                  'url': '/',
                  'badge': {
                    'num': 25,
                    'bg': '#F44336',
                    'fg': '#FFFFFF'
                  }
                }
              ]
            }
          ]
        }
      ]);
    }
  }
}
