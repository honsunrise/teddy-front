import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {AccountService} from '../../../service/account/account.service';
import {AuthGuard} from '../../../auth/auth.guard.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DialogMailConfirmErrorComponent} from '../confirm-mail/confirm-mail.component';

@Component({
  selector: 'dialog-already-registered-error',
  template: '<h1 mat-dialog-title>Have already registered</h1>\n' +
  '<div mat-dialog-content>Are you want resend a email.</div>\n' +
  '<div mat-dialog-actions>\n' +
  '  <button mat-button mat-dialog-close="true">Yes</button>\n' +
  '  <button mat-button mat-dialog-close="false">No</button>\n' +
  '</div>'
})
export class DialogSignupErrorComponent {
  constructor(public dialogRef: MatDialogRef<DialogMailConfirmErrorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;

  constructor(public dialog: MatDialog,
              private accountService: AccountService, private authGuard: AuthGuard, private fb: FormBuilder) {
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
    }, error => {
      if (error.status === 400 && error.error['code'] === 2400008) {
        this.dialog.open(DialogSignupErrorComponent, {
          disableClose: true,
          width: '350px',
        }).beforeClose().subscribe((ans) => {
          if (ans) {
            this.accountService.resendRegisterEmail(this.form.value['email']).subscribe();
            this.authGuard.redirect();
          }
        });
      }
    });
  }
}
