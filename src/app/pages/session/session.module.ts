import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {SessionRoutes} from './session.routing';
import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';
import {ForgotComponent} from './forgot/forgot.component';
import {LockscreenComponent} from './lockscreen/lockscreen.component';
import {SigninComponent} from './signin/signin.component';
import {DialogSignupErrorComponent, SignupComponent} from './signup/signup.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared/shared.module';
import {MaterialModule} from '../../shared/material.module';
import {MailConfirmComponent} from './mail-confirm/mail-confirm.component';
import {ConfirmMailComponent, DialogMailConfirmErrorComponent} from './confirm-mail/confirm-mail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    NotFoundComponent,
    ErrorComponent,
    ForgotComponent,
    LockscreenComponent,
    SigninComponent,
    SignupComponent,
    MailConfirmComponent,
    ConfirmMailComponent,
    DialogMailConfirmErrorComponent,
    DialogSignupErrorComponent
  ],
  entryComponents: [
    DialogMailConfirmErrorComponent,
    DialogSignupErrorComponent
  ]
})

export class SessionModule {
}
