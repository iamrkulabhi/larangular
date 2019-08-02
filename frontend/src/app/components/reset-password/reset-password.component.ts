import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {SnotifyService} from 'ng-snotify';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form = {
    email: null
  };

  changePasswordForm = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  };

  passwodNotConfirmed = false;

  error = null;
  successMessage = null;

  constructor(
    private authService: AuthenticationService,
    private snotifyService: SnotifyService,
    private activeRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(
      params => {
        this.changePasswordForm.resetToken = params['token'];
      }
    );
  }

  onSubmit() {
    // console.log(this.form);
    this.authService.resetPasswordLink(this.form).subscribe(
      (data: any) => {
        // console.log(data);
        this.successMessage = data.data;
        this.form.email = null;
        this.error = null;
      },
      error => {
        // this.snotifyService.error(error.error.error);
        this.error = error.error.error;
      }
    );
  }

  changePassword() {
    // console.log(this.changePasswordForm);
    this.authService.changePassword(this.changePasswordForm).subscribe(
      (data: any) => {
        console.log(data);
        this.successMessage = data.data;
        this.error = null;
        this.router.navigate(['/login']);
      },
      error => {
          if (error.error.error !== '') {
            this.error = error.error.error;
          }
          if (error.error.errors) {
            const allErrors = error.error.errors;
            // tslint:disable-next-line: forin
            for (let key in allErrors) {
              // console.log(allErrors[key][0]);
              this.error = allErrors[key][0];
              break;
            }
          }
      }
    );
  }

  checkPasswordConfirmed(event: any) {
    // console.log(event.target.value);
    if (event.target.value !== this.changePasswordForm.password) {
      this.passwodNotConfirmed = true;
    } else {
      this.passwodNotConfirmed = false;
    }
  }
}
