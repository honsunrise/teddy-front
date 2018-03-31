import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  url: string;
  dark: boolean;
  boxed: boolean;
  collapseSidebar: boolean;
  @ViewChild('sidemenu') sidemenu;
  @ViewChild('root') root;
  private _router: Subscription;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
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
}
