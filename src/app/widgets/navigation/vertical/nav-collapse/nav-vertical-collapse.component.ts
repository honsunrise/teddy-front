import {Component, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NavigationGroup} from '../../navigation.model';
import {APP_ANIMATIONS} from '../../../../animations';
import {NavigationService} from '../../navigation.service';

@Component({
  selector: 'nav-vertical-collapse',
  templateUrl: './nav-vertical-collapse.component.html',
  styleUrls: ['./nav-vertical-collapse.component.scss'],
  animations: APP_ANIMATIONS
})
export class NavVerticalCollapseComponent implements OnInit, OnDestroy {
  @Input()
  model: NavigationGroup;

  @Input()
  level = 0;

  @HostBinding('class.open')
  isOpen = false;

  private sub;

  constructor(private navigationService: NavigationService, private router: Router) {
    setTimeout(() => this.checkOpenLinks());
    // Listen for collapsing of any navigation item
    this.navigationService.onNavCollapseToggled
      .subscribe(
        (clickedItem) => {
          if (clickedItem && clickedItem.children) {
            // Check if the clicked item is one
            // of the children of this item
            if (this.isChildrenOf(this.model, clickedItem)) {
              return;
            }

            // Check if the url can be found in
            // one of the children of this item
            if (this.isUrlInChildren(this.model, this.router.url)) {
              return;
            }

            // If the clicked item is not this item, collapse...
            if (this.model !== clickedItem) {
              this.collapse();
            }
          }
        }
      );
  }

  ngOnInit(): void {
    this.sub = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event) => {
      this.checkOpenLinks();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  /**
   * Toggle collapse
   *
   * @param ev
   */
  toggleOpen(ev) {
    ev.preventDefault();

    this.isOpen = !this.isOpen;

    // Navigation collapse toggled...
    this.navigationService.onNavCollapseToggled.emit(this.model);
  }

  /**
   * Expand the collapsable navigation
   */
  expand() {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
  }

  /**
   * Collapse the collapsable navigation
   */
  collapse() {
    if (!this.isOpen) {
      return;
    }
    this.isOpen = false;
  }

  private checkOpenLinks() {
    if (this.isUrlInChildren(this.model, this.router.url)) {
      this.expand();
    }
  }

  /**
   * Check if the given parent has the
   * given item in one of its children
   *
   * @param parent
   * @param item
   * @return {any}
   */
  private isChildrenOf(parent, item) {
    if (!parent.children) {
      return false;
    }

    if (parent.children.indexOf(item) !== -1) {
      return true;
    }

    for (const children of parent.children) {
      if (children.children) {
        return this.isChildrenOf(children, item);
      }
    }
  }

  /**
   * Check if the given url can be found
   * in one of the given parent's children
   *
   * @param parent
   * @param url
   * @returns {any}
   */
  private isUrlInChildren(parent, url) {
    if (!parent.children) {
      return false;
    }

    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].children) {
        if (this.isUrlInChildren(parent.children[i], url)) {
          return true;
        }
      }

      if (parent.children[i].url === url) {
        return true;
      }
    }

    return false;
  }
}
