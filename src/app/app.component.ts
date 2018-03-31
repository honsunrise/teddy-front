import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SplashScreenService} from './service/splash/splash-screen.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<mat-progress-bar *ngIf="showLoadingBar" class="loading-bar" color="accent" mode="indeterminate">' +
  '</mat-progress-bar><router-outlet></router-outlet>',
  styles: ['.loading-bar {position: absolute;top: 0;left: 0;right: 0;width: 100%; z-index: 9999999;}']
})
export class AppComponent implements OnInit, OnDestroy {
  showLoadingBar = false;
  private sub;

  constructor(translate: TranslateService, private splashScreen: SplashScreenService, private router: Router) {
    translate.addLangs(['en', 'cn']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|cn/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.showLoadingBar = true;
        }
        if (event instanceof NavigationEnd) {
          this.showLoadingBar = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
