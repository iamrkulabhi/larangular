import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.authService.loggedIn());

  authStatus = this.loggedIn.asObservable();

  constructor(private authService: AuthenticationService) { }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }
}
