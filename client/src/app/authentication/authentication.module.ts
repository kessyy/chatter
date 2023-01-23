import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PagesModule } from '../pages/pages.module';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordStrengthComponent } from '../components/password-strength/password-strength.component';
import { AuthenticationRoutingModule } from './authentication-routing';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    LoginComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    PasswordStrengthComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationRoutingModule,
    PagesModule,
    NgxIntlTelInputModule,
  ]
})
export class AuthenticationModule { }
