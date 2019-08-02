import { Component, OnInit } from '@angular/core';
import { CheckAuthService } from 'src/app/services/check-auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(
    private authCheck: CheckAuthService,
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.authCheck.authStatus.subscribe(
      value => {
        this.isLoggedIn = value;
      }
    );
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.authService.removeApiToken();
    this.authCheck.changeAuthStatus(false);
    this.router.navigate(['/login']);
  }

}
