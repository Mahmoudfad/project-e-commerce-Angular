import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   baseURL= environment.baseURL
  constructor(public http:HttpClient) { }

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
}
