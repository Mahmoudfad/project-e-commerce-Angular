import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  sharedDataComand= []as any
  sharedDataCart=JSON.parse(localStorage.getItem('cart') || '[]')
  // listProductsSubject = new BehaviorSubject<[]>([])

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
   getCategoryByName(name){
    return this.http.get( this.baseURL + '/categorie/getCategoryByName/'+name)
   }

   getGenderByName(name){
    return this.http.get(this.baseURL + '/gender/getGenderByName/'+name)
   }

   getProductById(id){
     return this.http.get(this.baseURL+ '/products/productById/'+id)
   }

   updateProductAfterComfirmation(id,updatedProduct){
     return this.http.put(this.baseURL + '/products/updateAfterComfirmation/'+ id,updatedProduct)
   }


   postCmd(data){
          return this.http.post(this.baseURL + '/products/postCmd',data)

   }
}
