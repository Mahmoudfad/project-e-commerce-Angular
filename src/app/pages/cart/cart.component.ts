import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AnyAaaaRecord } from 'dns';
import { ProductService } from 'src/app/services/product.service';
import { Data, AppService } from '../../app.service';
import { comandModel } from '../cart/comandModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  cartItemCount = [];
  cartItemCountTotal = 0;
  constructor(public appService:AppService , public productService : ProductService , private router: Router) { }
  cartTab
  count=1
  selectSize :FormGroup;

  productSizeTab =[] as any
  messageQuantity : any

  sizeComandTab:any
  alertEx= false
  sizeObject:any
  comandObject : any


  ngOnInit() {


  




    // .forEach(product=>{
    //   this.total[product.id] = product.cartCount*product.newPrice;
    //   this.grandTotal += product.cartCount*product.newPrice;
    //   this.cartItemCount[product.id] = product.cartCount;
    //   this.cartItemCountTotal += product.cartCount;
    // })

   this.cartTab= JSON.parse(localStorage.getItem('cart') || '[]')
   console.log(this.cartTab);

   this.cartTab.forEach(element => {
     console.log(element.sizesQuantity);
     
   });


   

  }


  changeSize(value,productId){
    console.log(value);
 this.sizeObject={
  size : value,
  id : productId
}
this.productSizeTab.push(this.sizeObject)
console.log(this.productSizeTab);

  }
 
  public increment(i,product){

if (this.cartTab[i].cartCount == null ) {
        this.cartTab[i].cartCount=1
        this.cartTab[i].cartCount+=1

   if (this.productSizeTab[i] != null) {
  const elementFound = product.sizesQuantity.find(element=>element.size == this.productSizeTab[i])
  
        if (elementFound.quantity>= this.cartTab[i].cartCount) {
           localStorage.setItem('cart',JSON.stringify(this.cartTab))
           
         }
         else{
         this.messageQuantity="The selected quantity is not available in the stock"
         this.alertEx=true

         console.log(this.messageQuantity);
         }

}
else{
  this.messageQuantity="Select a size before"
  this.alertEx=true
  console.log(this.messageQuantity);
}
      }
      else {
        this.cartTab[i].cartCount+=1
        if (this.productSizeTab[i] != null) {
          const elementFound = product.sizesQuantity.find(element=>element.size == this.productSizeTab[i])
          
                if (elementFound.quantity>= this.cartTab[i].cartCount) {
                   localStorage.setItem('cart',JSON.stringify(this.cartTab))
                   console.log(this.productSizeTab[i] , elementFound.quantity);                  
                 }
                 else{
                 this.messageQuantity="The selected quantity is not available in the stock"
                 this.alertEx=true
                 console.log(this.messageQuantity); 
                 }
        }
        else{
          this.messageQuantity="Select a size before"
          this.alertEx=true
          console.log(this.messageQuantity);
        }
      }

      console.log(this.productSizeTab);
      
    }
        






    decrement(i,product) {
      if (this.cartTab[i].cartCount == null ) {
        this.cartTab[i].cartCount=1
        this.cartTab[i].cartCount-=1

   if (this.productSizeTab[i] != null) {
  const elementFound = product.sizesQuantity.find(element=>element.size == this.productSizeTab[i])
  
        if (elementFound.quantity>= this.cartTab[i].cartCount) {
           localStorage.setItem('cart',JSON.stringify(this.cartTab))
           console.log('aaa');
           this.alertEx=false

           
         }
         else{
         this.messageQuantity="The selected quantity is not available in the stock"
         this.alertEx=true

         console.log(this.messageQuantity);
         }

}
else{
  this.messageQuantity="Select a size before"
  this.alertEx=true
  console.log(this.messageQuantity);
}
      }
      else {
        this.cartTab[i].cartCount-=1
        if (this.productSizeTab[i] != null) {
          const elementFound = product.sizesQuantity.find(element=>element.size == this.productSizeTab[i])
          
                if (elementFound.quantity>= this.cartTab[i].cartCount) {
                  this.alertEx=false
                   localStorage.setItem('cart',JSON.stringify(this.cartTab))
                   console.log(this.productSizeTab[i] , elementFound.quantity);  
                
                 }
                 else{
                 this.messageQuantity="The selected quantity is not available in the stock"
                 this.alertEx=true
                 console.log(this.messageQuantity); 
                 }
        }
        else{
          this.messageQuantity="Select a size before"
          this.alertEx=true
          console.log(this.messageQuantity);
        }
      }
    }

  public updateCart(value){
    if(value){
      this.total[value.productId] = value.total;
      this.cartItemCount[value.productId] = value.soldQuantity;
      this.grandTotal = 0;
      this.total.forEach(price=>{
        this.grandTotal += price;
      });
      this.cartItemCountTotal = 0;
      this.cartItemCount.forEach(count=>{
        this.cartItemCountTotal +=count;
      });
     
      this.appService.Data.totalPrice = this.grandTotal;
      this.appService.Data.totalCartCount = this.cartItemCountTotal;

      this.appService.Data.cartList.forEach(product=>{
        this.cartItemCount.forEach((count,index)=>{
          if(product.id == index){
            product.cartCount = count;
          }
        });
      });
      
    }
  }

  public remove(product) {
    const index: number = this.appService.Data.cartList.indexOf(product);
    if (index !== -1) {
      this.appService.Data.cartList.splice(index, 1);
      this.grandTotal = this.grandTotal - this.total[product.id]; 
      this.appService.Data.totalPrice = this.grandTotal;       
      this.total.forEach(val => {
        if(val == this.total[product.id]){
          this.total[product.id] = 0;
        }
      });

      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product.id]; 
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val=>{
        if(val == this.cartItemCount[product.id]){
          this.cartItemCount[product.id] = 0;
        }
      });
      this.appService.resetProductCartCount(product);
    }     
  }

  public clear(){
    this.appService.Data.cartList.forEach(product=>{
      this.appService.resetProductCartCount(product);
    });
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  
  } 


  toCheckOut (){
     

    this.productSizeTab.forEach((element, i) => {
      console.log(element,i);
    this.productService.sharedDataComand.push(element)
if (element.size) {
  this.router.navigateByUrl('/checkout')}
else {
  this.messageQuantity=" Please select a size"
}
});

console.log(this.productService.sharedDataComand);


}




  }


