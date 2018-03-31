import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, NavigationExtras, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private redirectUrl: string;

  constructor(private auth: AuthService, private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.redirectUrl = state.url;
    if (this.auth.checkLogin()) {
      return true;
    } else {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  public redirect() {
    // Get the redirect URL from our auth service
    // If no redirect has been set, use the default
    const redirect = this.redirectUrl ? this.redirectUrl : '/';

    // Set our navigation extras object
    // that passes on our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };

    // Redirect the user
    this.router.navigate([redirect], navigationExtras);
  }
}
