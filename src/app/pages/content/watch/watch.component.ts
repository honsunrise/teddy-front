import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../service/content/content.service';
import { EmbedVideoService } from '../../../service/embed-video/embed-video.service';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {
  id: string;
  iframe: string;
  external: boolean;
  loading = true;
  favorites: number;
  isFavorite: boolean;
  isThumbUp: boolean;
  thumbUps: number;
  isThumbDown: boolean;
  thumbDowns: number;
  watchs: number;
  title: string;
  private sub: any;

  constructor(private contentService: ContentService, private embedService: EmbedVideoService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.contentService.getInfoDetail(this.id).subscribe(info => {
        this.title = info.title;
        this.watchs = info.watchCount;
        this.external = info.external;
        this.favorites = info.favorites;
        this.isFavorite = info.isFavorite;
        this.isThumbUp = info.isThumbUp;
        this.thumbUps = info.thumbUps;
        this.isThumbDown = info.isThumbDown;
        this.thumbDowns = info.thumbDowns;
        this.iframe = this.embedService.embed(info.movieUrl);
        this.loading = false;
      });
      this.contentService.watchInfo(this.id).subscribe();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // TODO: add TO list
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
