import {Component, Input, OnInit} from '@angular/core';
import {NavigationItem} from '../../navigation.model';

@Component({
  selector: 'nav-vertical-item',
  templateUrl: './nav-vertical-item.component.html',
  styleUrls: ['./nav-vertical-item.component.scss']
})
export class NavVerticalItemComponent implements OnInit {
  @Input()
  model: NavigationItem;

  @Input()
  level = 0;

  constructor() {
  }

  ngOnInit() {
  }
}
