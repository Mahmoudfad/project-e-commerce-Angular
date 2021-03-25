
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
    const expectedRole = "admin";
    const token = localStorage.getItem('token') ||'';
    // decode the token to get its payload
    this.tokenPayload = decode(token);
    console.log(this.tokenPayload.role);
    
    
    if (this.auth.isAuthenticated() == true ) {
      this.router.navigate(['sign-in']);
      if ( this.tokenPayload.role !== expectedRole){
        this.router.navigate(['products']);
        return false
      }
    else  return false
    }
    return true;
  }
}