import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  sharedDataComand= []as any
  

   baseURL= environment.baseURL
  constructor(public http:HttpClient) { }

  addProduct(data)
  {
    return this.http.post( this.baseURL + '/products/addProduct',data)
  }
  getAllProducts(){
    return this.http.get(this.baseURL + '/products/getAllProducts')
  }




  getProductByGenderAndCategory(gender,categorie)
   {
    return this.http.get( this.baseURL + '/products/getProductsByGenderAndCategory/' + gender +'/'+ categorie)
   }


   getProductByGender(gender)
   {
    return this.http.get( this.baseURL + '/products/getProductsByGender/'+gender)
   }

   getAllCategories(){
    return this.http.get( this.baseURL + '/categorie/getAllCategorie')
   }

   
}
