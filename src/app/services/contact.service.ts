import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    baseURL= environment.baseURL
    constructor(public http:HttpClient) { }

contactAdmin(data)
  {
    return this.http.post( this.baseURL + '/users/contact',data)
  }
   getAllContacts()
  {         
    return this.http.get(this.baseURL + '/users/getAllContacts')
  } 
  messageViewed(id){
    return this.http.get(this.baseURL + '/users/updateStatusById/'+ id)
  }

}
