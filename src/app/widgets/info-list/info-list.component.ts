import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {InfoWithTime} from '../../service/domain/InfoWithTime';
import {APP_ANIMATIONS} from '../../animations';

@Component({
  selector: 'info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.scss'],
  animations: APP_ANIMATIONS
})
export class InfoListComponent implements OnInit, OnDestroy {
  @Input()
  infos: Array<InfoWithTime>;

  @Output()
  infoClick = new EventEmitter<InfoWithTime>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  click(info: InfoWithTime) {
    this.infoClick.emit(info);
  }
}
