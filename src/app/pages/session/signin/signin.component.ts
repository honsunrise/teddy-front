import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;
  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      username: [null , Validators.compose ( [ Validators.required ] )] , password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {
    this.authService.login(this.form.value['username'], this.form.value['password']).subscribe(() => {

      // Get the redirect URL from our auth service
      // If no redirect has been set, use the default
      const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

      // Set our navigation extras object
      // that passes on our global query params and fragment
      const navigationExtras: NavigationExtras = {
        queryParamsHandling: 'preserve',
        preserveFragment: true
      };

      // Redirect the user
      this.router.navigate([redirect], navigationExtras);
    });
  }

}
