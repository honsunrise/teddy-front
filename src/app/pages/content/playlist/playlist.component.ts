import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InfoWithTime} from '../../../service/domain/InfoWithTime';
import {ContentService} from '../../../service/content/content.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlayListComponent implements OnInit, OnDestroy {
  infoList: Array<InfoWithTime> = [];
  type: string;
  private sub: any;

  constructor(private contentService: ContentService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
      if (this.type !== 'favorite' && this.type !== 'later') {
        this.router.navigate(['session/404']);
      } else if (this.type === 'favorite') {
        this.infoList = [];
        this.contentService.getUserFavoriteList().subscribe(value => {
          this.infoList = value;
        });
      } else if (this.type === 'later') {
        this.infoList = [];
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
