import {Component, Input, OnInit} from '@angular/core';
import {NavigationGroup} from '../../navigation.model';

@Component({
  selector: 'nav-vertical-group',
  templateUrl: './nav-vertical-group.component.html',
  styleUrls: ['./nav-vertical-group.component.scss']
})
export class NavVerticalGroupComponent implements OnInit {
  @Input()
  model: NavigationGroup;

  @Input()
  level = 0;

  constructor() {
  }

  ngOnInit() {
  }

}
