import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseItem} from './navigation.model';
import {NavigationLoader} from './navigation.loader';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  @Input()
  layout = 'vertical';

  @Input()
  level = 0;

  navigationModel: Array<BaseItem>;

  constructor(public loader: NavigationLoader) {
  }

  ngOnInit(): void {
    this.loader.getItems().subscribe(items => {
      this.navigationModel = items;
    });
  }

  ngOnDestroy() {
  }

}
