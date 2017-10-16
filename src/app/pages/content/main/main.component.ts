import { Component } from '@angular/core';
import { Media } from '../../../widgets/media-card/media-card.media';
import { Router } from '@angular/router';
import { ContentService } from '../../../service/content/content.service';

@Component({
  selector: 'app-dashboard',
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
          coverUrl: 'assets/images/unsplash/' + 1 + '.jpg',
          favorites: info.favorites,
          isFavorite: info.isFavorite,
          param: info.id,
          onClickFavorite: param => {
            contentService.favoriteInfo(param).subscribe(data => {

            });
          },
          onClickWatch: param => {
            this.goToWatchPage(param);
          },
        };
        this.medias.push(media);
      }
    });
    contentService.getUserFavoriteList().subscribe(favoriteList => {
      console.log(favoriteList);
    });
  }

  goToWatchPage(id) {
    this.router.navigate(['/watch', id]);
  }
}
