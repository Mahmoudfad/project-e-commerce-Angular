import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { JwtHelperService } from '@auth0/angular-jwt';
=======
import { BehaviorSubject, Observable } from 'rxjs';
>>>>>>> 117f90a434ef003c16d0d836a254ec75c7c11b8e
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(false);
  // private hasToken() : boolean {
  //   return !!localStorage.getItem('token');
  // }
   baseURL= environment.baseURL
<<<<<<< HEAD
  constructor(public http:HttpClient, public jwtHelper: JwtHelperService) { }

=======
  constructor(public http:HttpClient) { }
  // isLoggedIn() : Observable<boolean> {
  //   return this.isLoginSubject.asObservable();
  //  }
>>>>>>> 117f90a434ef003c16d0d836a254ec75c7c11b8e
  login(data)
  {
     return this.http.post(this.baseURL + '/users/login', data)
  }

  register(data)
  {
    return this.http.post( this.baseURL + '/users/userCreate',data)
  }

  registerMail(user)
  {
    return this.http.get( this.baseURL + '/email/register/'+ user.id)
  }

  signInSubject(){
    localStorage.setItem('token', 'JWT');
    this.isLoginSubject.next(true); 
    
   }
   logout() {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }

 
  // getUsers(data){
  //   return this.http.get( this.baseURL + '/users/userCreate',data)
  // }

<<<<<<< HEAD
  public getToken(): string {
    return JSON.parse(localStorage.getItem('connectedUser')).token;
  }
  // public isAuthenticated(): boolean {
  //   // get the token
  //   const token = this.getToken();
  //   // return a boolean reflecting 
  //   // whether or not the token is expired
  //   return tokenNotExpired(null, token);
  // }



  //gard : 

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
  }



=======
  // getLoginButton(){
  //   this.loginSubject.next(true)
  //   return this.http.post(this.baseURL + '/users/login', data)

  // }
}
>>>>>>> 117f90a434ef003c16d0d836a254ec75c7c11b8e
