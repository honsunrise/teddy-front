import { Routes } from '@angular/router';

import { BlankComponent } from './blank/blank.component';
import { MainComponent } from './main/main.component';
import { CateComponent } from './cate/cate.component';
import { WatchComponent } from './watch/watch.component';
import { PublishComponent } from './publish/publish.component';
import { PlayListComponent } from './playlist/playlist.component';

export const ContentRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
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
      path: 'blank',
      component: BlankComponent
    }]
  }
];
