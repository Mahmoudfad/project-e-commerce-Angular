
import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
@Injectable({  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  tokenPayload
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = "user";
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    this.tokenPayload = decode(token);
    
    if (
      !this.auth.isAuthenticated() 
     ||  this.tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['sign-in']);
      return false
    }
    return true;
  }
}