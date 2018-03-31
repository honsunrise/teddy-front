import {Component} from '@angular/core';
import {Media} from '../../../widgets/media-card/media-card.media';
import {Router} from '@angular/router';
import {ContentService} from '../../../service/content/content.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  medias: Media[] = [];

  constructor(private contentService: ContentService, private router: Router) {
    contentService.getInfoList(0, 20).subscribe(infoList => {
      for (const info of infoList) {
        const media: Media = {
          title: info.title,
          content: info.content,
          coverUrl: info.coverList != null && info.coverList.length !== 0
            ? info.coverList [0] : 'assets/images/unsplash/' + Math.ceil(Math.random() * 1000 % 22) + '.jpg',
          favorites: info.favorites,
          watchCount: info.watchCount,
          isFavorite: info.isFavorite,
          onClickFavorite: (isFavorite) => {
            contentService.favoriteInfo(info.id, !isFavorite).subscribe();
          },
          onClickWatch: () => {
            this.goToWatchPage(info.id);
          },
        };
        this.medias.push(media);
      }
    });
  }

  goToWatchPage(id) {
    this.router.navigate(['/watch', id]);
  }
}
