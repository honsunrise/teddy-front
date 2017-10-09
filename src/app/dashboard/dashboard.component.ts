import { Component } from '@angular/core';
import { Media } from '../widgets/media-card/media-card.media';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  medias: Media[] = [];

  constructor(private router: Router) {
    for (let i = 1; i < 23; i++) {
      const media: Media = {
        title: 'Hello' + i,
        content: 'Text' + i,
        coverUrl: 'assets/images/unsplash/' + i + '.jpg',
        likes: i,
        param: i,
        onClickFavorite: param => {},
        onClickWatch: param => {
          this.goToWatchPage(param);
        },
      };
      this.medias.push(media);
    }
  }

  goToWatchPage(id) {
    this.router.navigate(['/watch', id]);
  }
}
