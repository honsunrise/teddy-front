import {Component, Input, OnInit} from '@angular/core';
import {Media} from './media-card.media';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements OnInit {
  isFavorite = false;
  favorites = 0;

  @Input() media: Media;

  constructor() {
  }

  ngOnInit() {
    this.isFavorite = this.media.isFavorite;
    this.favorites = this.media.favorites;
  }

  onClickFavorite() {
    this.favorites += this.isFavorite ? -1 : 1;
    this.isFavorite = !this.isFavorite;
    this.media.onClickFavorite(this.isFavorite);
  }
}
