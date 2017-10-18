import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';
import * as Ps from 'perfect-scrollbar';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  url: string;
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  compactSidebar: boolean;
  currentLang = 'en';
  @ViewChild('sidemenu') sidemenu;
  @ViewChild('root') root;
  private _router: Subscription;

  constructor(public authService: AuthService, private router: Router, public menuItems: MenuItems, public translate: TranslateService) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|cn/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
    const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-sidenav-content');

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
      Ps.initialize(elemSidebar, {wheelSpeed: 2, suppressScrollX: true});
      Ps.initialize(elemContent, {wheelSpeed: 2, suppressScrollX: true});
    }

    this.url = this.router.url;

    this._router = this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
      document.querySelector('.app-inner .mat-sidenav-content').scrollTop = 0;
      this.url = event.url;
      this.runOnRouteChange();
    });
  }

  ngAfterViewInit(): void {
    this.root.dir = 'ltr';
    this.runOnRouteChange();
  }

  ngOnDestroy(): void {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
      const elemContent = <HTMLElement>document.querySelector('.app-inner > .mat-sidenav-content');
      Ps.update(elemContent);
    }
  }

  isOver(): boolean {
    if (this.url.search('/watch') >= 0 || this.url.search('/publish') >= 0) {
      return true;
    } else {
      return window.matchMedia(`(max-width: 960px)`).matches;
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  menuMouseOver(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac() && !this.compactSidebar) {
      const elemSidebar = <HTMLElement>document.querySelector('.app-inner > .sidebar-panel');
      setTimeout(() => {
        Ps.update(elemSidebar);
      }, 350);
    }
  }
}
