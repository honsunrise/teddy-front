import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoWithTime } from '../../../service/domain/InfoWithTime';
import { ContentService } from '../../../service/content/content.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlayListComponent implements OnInit, OnDestroy {
  favoriteList: Array<InfoWithTime> = [];
  watchLaterList: Array<InfoWithTime> = [];
  private sub: any;
  type: string;

  constructor(private contentService: ContentService, private route: ActivatedRoute, private router: Router) {
    contentService.getUserFavoriteList().subscribe(value => {
      this.favoriteList = value;
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      if (this.type !== 'thumbUp' && this.type !== 'later') {
        this.router.navigate(['session/404']);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToWatchInfo(id: String) {
    this.router.navigate(['/watch', id]);
  }
}
