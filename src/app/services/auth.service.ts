import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
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
  constructor(public http:HttpClient) { }
  // isLoggedIn() : Observable<boolean> {
  //   return this.isLoginSubject.asObservable();
  //  }
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

  public getToken(): string {
    return JSON.parse(localStorage.getItem('token')).token
  }
  // public isAuthenticated(): boolean {
  //   // get the token
  //   const token = this.getToken();
  //   // return a boolean reflecting 
  //   // whether or not the token is expired
  //   return tokenNotExpired(null, token);
  // }



  //gard : 

  public isAuthenticated() : boolean {
    const token = JSON.parse(JSON.stringify(localStorage.getItem('token'))) 
    console.log(token);
    return token == null ;
  }





  getUser(id)
  {
     return this.http.get(this.baseURL + '/users/getUser/'+ id)
  }








}

