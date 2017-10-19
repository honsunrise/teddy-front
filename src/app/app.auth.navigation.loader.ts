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
          'id': 'applications',
          'title': 'Applications',
          'type': 'group',
          'children': [
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
                  'url': '/home',
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
