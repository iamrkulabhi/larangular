import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './services/authentication.service';
import { CheckAuthService } from './services/check-auth.service';
import { IfLoggedInService } from './services/if-logged-in.service';
import { IfNotLoggedInService } from './services/if-not-logged-in.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    HomeComponent,
    PageNotFoundComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule
  ],
  providers: [
    AuthenticationService,
    CheckAuthService,
    IfLoggedInService,
    IfNotLoggedInService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
