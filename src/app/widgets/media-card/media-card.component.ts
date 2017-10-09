import { Component, Input, OnInit } from '@angular/core';
import { Media } from './media-card.media';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss']
})
export class MediaCardComponent implements OnInit {
  @Input() media: Media;

  constructor() {
  }

  ngOnInit() {
  }

}
