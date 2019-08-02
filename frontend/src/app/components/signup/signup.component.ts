import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CheckAuthService } from 'src/app/services/check-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  };

  passwodNotConfirmed = false;

  error = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private checkAuth: CheckAuthService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);
    return this.authService.signupMethod(this.form).subscribe(
      (data: any) => {
        // console.log(data.access_token);
        this.authService.handleApiToken(data.access_token);
        this.error = [];
        this.checkAuth.changeAuthStatus(true);
        this.router.navigate(['/profile']);
      },
      error => { this.handleErrors(error); }
    );
  }

  handleErrors(error) {
    // console.log(error.error.errors);
    this.error = error.error.errors;
  }

  checkPasswordConfirmed(event: any) {
    // console.log(event.target.value);
    if (event.target.value !== this.form.password) {
      this.passwodNotConfirmed = true;
    } else {
      this.passwodNotConfirmed = false;
    }
  }
}
