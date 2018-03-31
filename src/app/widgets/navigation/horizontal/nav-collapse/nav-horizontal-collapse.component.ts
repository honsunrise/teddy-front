import {Component, HostBinding, HostListener, Input, OnDestroy} from '@angular/core';
import {NavigationGroup} from '../../navigation.model';

@Component({
  selector: 'nav-horizontal-collapse',
  templateUrl: './nav-horizontal-collapse.component.html',
  styleUrls: ['./nav-horizontal-collapse.component.scss']
})
export class NavHorizontalCollapseComponent implements OnDestroy {
  isOpen = false;

  @HostBinding('class') classes = 'nav-model nav-collapse';
  @Input() model: NavigationGroup;

  constructor() {
  }

  @HostListener('mouseenter')
  open() {
    this.isOpen = true;
  }

  @HostListener('mouseleave')
  close() {
    this.isOpen = false;
  }

  ngOnDestroy() {
  }
}
