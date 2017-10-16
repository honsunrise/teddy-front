import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../../service/content/content.service';
import { EmbedVideoService } from '../../../service/embed-video/embed-video.service';

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
  title: string;
  private sub: any;

  constructor(private contentService: ContentService, private embedService: EmbedVideoService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.contentService.getInfoDetail(this.id).subscribe(info => {
        this.title = info.title;
        this.favorites = info.favorites;
        this.external = info.external;
        this.iframe = this.embedService.embed(info.movie);
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onLike() {

  }
}
