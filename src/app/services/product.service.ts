import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   baseURL= environment.baseURL
  constructor(public http:HttpClient) { }

  addProduct(data)
  {
    return this.http.post( this.baseURL + '/products/addProduct',data)
  }
  getAllProducts(){
    return this.http.get(this.baseURL + '/products/getAllProducts')
  }
}
