import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';
import {AuthGuard} from '../../../auth/auth.guard.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public form: FormGroup;

  constructor(private authService: AuthService, private authGuard: AuthGuard, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
    this.form.get('username').valueChanges.subscribe(() => {
      this.form.get('username').updateValueAndValidity({emitEvent: false});
      this.form.get('password').updateValueAndValidity({emitEvent: false});
    });
    this.form.get('password').valueChanges.subscribe(() => {
      this.form.get('username').updateValueAndValidity({emitEvent: false});
      this.form.get('password').updateValueAndValidity({emitEvent: false});
    });
  }

  onSubmit() {
    this.authService.login(this.form.value['username'],
      this.form.value['password'])
      .subscribe(() => {
        this.authGuard.redirect();
      }, err => {
        if (err.error['code'] === 2400010) {
          this.form.get('username').setErrors({notCorrect: true});
          this.form.get('password').setErrors({notCorrect: true});
        } else {
          console.log(err);
        }
      });
  }

}
