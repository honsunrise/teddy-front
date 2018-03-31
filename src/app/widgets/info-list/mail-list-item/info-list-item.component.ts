import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {InfoWithTime} from '../../../service/domain/InfoWithTime';

@Component({
  selector: 'info-list-item',
  templateUrl: './info-list-item.component.html',
  styleUrls: ['./info-list-item.component.scss']
})
export class InfoListItemComponent implements OnInit, OnDestroy {
  @Input()
  model: InfoWithTime;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
