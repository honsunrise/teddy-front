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
    contentService.getInfoList(0, 20).subscribe(infos => {
      for (const info of infos) {
        const media: Media = {
          title: info.title,
          content: info.content,
          coverUrl: 'assets/images/unsplash/' + 1 + '.jpg',
          likes: info.praise,
          param: info.id,
          onClickFavorite: param => {
          },
          onClickWatch: param => {
            this.goToWatchPage(param);
          },
        };
        this.medias.push(media);
      }
    });
    // for (let i = 1; i < 23; i++) {
    //   const media: Media = {
    //     title: 'Hello' + i,
    //     content: 'Text' + i,
    //     coverUrl: 'assets/images/unsplash/' + i + '.jpg',
    //     likes: i,
    //     param: i,
    //     onClickFavorite: param => {},
    //     onClickWatch: param => {
    //       this.goToWatchPage(param);
    //     },
    //   };
    //   this.medias.push(media);
    // }
  }

  goToWatchPage(id) {
    this.router.navigate(['/watch', id]);
  }
}
