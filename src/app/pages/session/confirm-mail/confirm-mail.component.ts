import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {APP_ANIMATIONS} from '../../../animations';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../service/account/account.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'dialog-mail-confirm-error',
  template: '<h1 mat-dialog-title>Email confirm error</h1>\n' +
  '<div mat-dialog-content>Your confirm link may not correct.</div>\n' +
  '<div mat-dialog-actions>\n' +
  '  <button mat-button mat-dialog-close>Close</button>\n' +
  '</div>'
})
export class DialogMailConfirmErrorComponent {
  constructor(public dialogRef: MatDialogRef<DialogMailConfirmErrorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}

@Component({
  selector: 'app-mail-confirm',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.scss'],
  animations: APP_ANIMATIONS
})
export class ConfirmMailComponent implements OnInit, OnDestroy {
  email = '';
  token = '';
  lang = '';
  loading = true;

  private sub: any;

  constructor(public dialog: MatDialog,
              private accountService: AccountService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      if (!params.hasOwnProperty('email')
        || !params.hasOwnProperty('token')
        || !params.hasOwnProperty('lang')) {
        this.router.navigate(['session/error']);
      }
      this.email = params['email'];
      this.token = params['token'];
      this.lang = params['lang'];
    });
    this.accountService.confirmEmail(this.email, this.token, this.lang).subscribe(() => {
      this.loading = false;
    }, error => {
      this.loading = false;
      this.dialog.open(DialogMailConfirmErrorComponent, {
        disableClose: true,
        width: '350px',
      }).beforeClose().subscribe(() => {
        this.router.navigate(['/']);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
