import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { IfLoggedInService } from './services/if-logged-in.service';
import { IfNotLoggedInService } from './services/if-not-logged-in.service';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IfNotLoggedInService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IfNotLoggedInService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [IfLoggedInService]
  },
  {
    path: 'password-reset',
    component: ResetPasswordComponent,
    canActivate: [IfNotLoggedInService]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
