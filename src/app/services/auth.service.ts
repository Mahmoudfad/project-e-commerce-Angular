import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   baseURL= environment.baseURL
  constructor(public http:HttpClient, public jwtHelper: JwtHelperService) { }

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
  // getUsers(data){
  //   return this.http.get( this.baseURL + '/users/userCreate',data)
  // }

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



