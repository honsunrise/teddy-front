import { Component, OnInit } from '@angular/core';
import { InfoWithTime } from '../../../service/domain/InfoWithTime';
import { ContentService } from '../../../service/content/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  favorites = 0;
  thumbUp = 0;
  thumbDown = 0;

  favoriteList: Array<InfoWithTime> = [];
  thumbUpList: Array<InfoWithTime> = [];
  thumbDownList: Array<InfoWithTime> = [];

  constructor(private contentService: ContentService, private router: Router) {
    contentService.getUserFavoriteList().subscribe(value => {
      this.favoriteList = value;
    });
    contentService.getUserThumbUpList().subscribe(value => {
      this.thumbUpList = value;
    });
    contentService.getUserThumbDownList().subscribe(value => {
      this.thumbDownList = value;
    });
  }

  ngOnInit() {
  }

  goToWatchInfo(id: String) {
    this.router.navigate(['/watch', id]);
  }
}
