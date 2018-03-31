import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from '../../../service/content/content.service';
import {EmbedVideoService} from '../../../service/embed-video/embed-video.service';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {
  id: string;
  url: string;
  external: boolean;
  realUrl: boolean;
  loading = true;
  isFavorite: boolean;
  favorites: number;
  isThumbUp: boolean;
  thumbUps: number;
  isThumbDown: boolean;
  thumbDowns: number;
  watchCount: number;
  title: string;
  private sub: any;

  constructor(private contentService: ContentService, private embedService: EmbedVideoService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.contentService.getInfoDetail(this.id).subscribe(info => {
        this.title = info.title;
        this.watchCount = info.watchCount;
        this.isFavorite = info.isFavorite;
        this.favorites = info.favorites;
        this.isThumbUp = info.isThumbUp;
        this.thumbUps = info.thumbUps;
        this.isThumbDown = info.isThumbDown;
        this.thumbDowns = info.thumbDowns;
        this.external = info.external;
        this.realUrl = info.realUrl;
        if (this.external) {
          if (this.realUrl) {
            this.url = info.movieUrl;
          } else {
            this.url = this.embedService.embed(info.movieUrl);
          }
        } else {
          this.url = info.movieUrl;
        }
        this.loading = false;
      });
      this.contentService.watchInfo(this.id).subscribe();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onLike() {
    this.favorites += this.isFavorite ? -1 : 1;
    this.isFavorite = !this.isFavorite;
    this.contentService.favoriteInfo(this.id, !this.isFavorite).subscribe();
  }

  onThumbUp() {
    if (this.isThumbDown) {
      this.onThumbDown();
    }
    this.thumbUps += this.isThumbUp ? -1 : 1;
    this.isThumbUp = !this.isThumbUp;
    this.contentService.thumbUpInfo(this.id, !this.isThumbUp).subscribe();
  }

  onThumbDown() {
    if (this.isThumbUp) {
      this.onThumbUp();
    }
    this.thumbDowns += this.isThumbDown ? -1 : 1;
    this.isThumbDown = !this.isThumbDown;
    this.contentService.thumbDownInfo(this.id, !this.isThumbDown).subscribe();
  }
}
