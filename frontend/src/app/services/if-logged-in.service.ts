import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})

export class IfLoggedInService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { }
}
