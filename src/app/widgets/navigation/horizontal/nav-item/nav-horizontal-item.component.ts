import {Component, HostBinding, Input} from '@angular/core';
import {NavigationItem} from '../../navigation.model';

@Component({
  selector: 'nav-horizontal-item',
  templateUrl: './nav-horizontal-item.component.html',
  styleUrls: ['./nav-horizontal-item.component.scss']
})
export class NavHorizontalItemComponent {
  @HostBinding('class') classes = 'nav-model';
  @Input() model: NavigationItem;
}
