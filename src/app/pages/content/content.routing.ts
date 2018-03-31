import {Routes} from '@angular/router';

import {BlankComponent} from './blank/blank.component';
import {MainComponent} from './main/main.component';
import {CateComponent} from './cate/cate.component';
import {WatchComponent} from './watch/watch.component';
import {PublishComponent} from './publish/publish.component';
import {PlayListComponent} from './playlist/playlist.component';
import {ProfileComponent} from './profile/profile.component';

export const ContentRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'home',
      component: MainComponent
    }, {
      path: 'cate',
      component: CateComponent
    }, {
      path: 'watch/:id',
      component: WatchComponent
    }, {
      path: 'publish',
      component: PublishComponent
    }, {
      path: 'playlist/:type',
      component: PlayListComponent
    }, {
      path: 'profile',
      component: ProfileComponent
    }, {
      path: 'blank',
      component: BlankComponent
    }, {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }]
  }
];
