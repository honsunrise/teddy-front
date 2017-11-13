import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AccountService } from '../../../service/account/account.service';
import { AuthGuard } from '../../../auth/auth.guard.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;

  constructor(private accountService: AccountService, private authGuard: AuthGuard, private fb: FormBuilder) {
  }

  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
      password: password,
      confirmPassword: confirmPassword,
      agree: [false, CustomValidators.equal(true)],
    });
  }

  onSubmit() {
    this.accountService.register(this.form.value['email'], this.form.value['password']).subscribe(() => {

      this.authGuard.redirect();
    });
  }
}
