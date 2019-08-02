import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CheckAuthService } from 'src/app/services/check-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  error = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private checkAuth: CheckAuthService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    // console.log(this.form);
    return this.authService.loginMethod(this.form).subscribe(
      (data: any) => {
        // console.log(data.access_token);
        this.authService.handleApiToken(data.access_token);
        this.error = null;
        this.checkAuth.changeAuthStatus(true);
        this.router.navigate(['/profile']);
      },
      error => { this.handleErrors(error); }
    );
  }

  handleErrors(error) {
    this.error = error.error.error;
  }
}
