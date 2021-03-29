import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  productSize =[] as any
  messageQuantity : any

  sizeComandTab:any
  alertEx= false
  sizeObject:any
  comandObject : any

  elementFound: any

  productPrice=0
totalCartPrice = 0
productWithoutDiscount:any;
productWithDiscount:any;
  enabledQuantity = false
  ngOnInit() {
    console.log("cart");
    
    // .forEach(product=>{
    //   this.total[product.id] = product.cartCount*product.newPrice;
    //   this.grandTotal += product.cartCount*product.newPrice;
    //   this.cartItemCount[product.id] = product.cartCount;
    //   this.cartItemCountTotal += product.cartCount;
    // })

   this.cartTab= JSON.parse(localStorage.getItem('cart') || '[]')
   this.appService.shoppingCartSubject.next(this.cartTab)
   console.log(this.appService.shoppingCartSubject.value);

   
    //  this.productWithoutDiscount=this.cartTab.find(element=>element.discount==null || element.discount==0 )
    //  this.productWithDiscount = this.cartTab.find(element =>element.discount !=null )
    //  console.log(this.productWithDiscount);
     
    //  console.log(this.productWithoutDiscount);
    //  console.log(this.productWithoutDiscount.price);
    //  console.log(product.cartCount);
     
    //  if(this.productWithoutDiscount == true && this.productWithDiscount == true){

    //    this.totalCartPrice=this.totalCartPrice+((product.price -(product.price * (product.discount/100)))* product.cartCount)
    //    +((this.productWithoutDiscount.price * product.cartCount))


    //    console.log(this.totalCartPrice);
    //    console.log( product.cartCount);
       
    //  }
    //  else if (this.productWithoutDiscount == false && this.productWithDiscount == true){
    // this.totalCartPrice=this.totalCartPrice+(product.price -(product.price * (product.discount/100)))* product.cartCount
    //  console.log('aa');
    //  }
    //  else if(this.productWithoutDiscount == true && this.productWithDiscount == false){
    //    this.totalCartPrice= this.totalCartPrice+((this.productWithoutDiscount.price * product.cartCount))
    //  }
    this.cartTab.forEach(product => {
      product.cartCount=1
    if (product.discount == 0 || product.discount == null) {
      this.totalCartPrice = this.totalCartPrice+ (product.price*product.cartCount)
      this.appService.totalSubject.next(this.totalCartPrice)
    }
    else if (product.discount != 0 || product.discount !== null){
      this.totalCartPrice = this.totalCartPrice+ (product.price -(product.price*(product.discount/100))*product.cartCount)
      this.appService.totalSubject.next(this.totalCartPrice)
    }


   });
  }


  changeSize(value,i){
    console.log(value);
// if (value) {
//   this.enabledQuantity=true
// }
console.log(i);

this.cartTab[i].selectedSize=value
localStorage.setItem('cart',JSON.stringify(this.cartTab))

  }
 
  public increment(i,product){

 
    
if (this.cartTab[i].cartCount == null ) {
        this.cartTab[i].cartCount=1
        this.cartTab[i].cartCount+=1

   if (product.selectedSize!=0) {
  let elementFound = product.sizesQuantity.find(element=>element.size == product.selectedSize)
  
        if (elementFound.quantity>= product.cartCount) {
           localStorage.setItem('cart',JSON.stringify(this.cartTab))
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
        this.cartTab[i].cartCount+=1
        console.log(this.cartTab[i].cartCount);
        
        if (product.seletedSize!=0) {
           this.elementFound = product.sizesQuantity.find(element=>element.size ==product.selectedSize)
     console.log("element found");
     
           console.log(this.elementFound);
      
                if (this.elementFound.quantity>=  this.cartTab[i].cartCount) {
                   localStorage.setItem('cart',JSON.stringify(this.cartTab))
                   console.log(product.selectedSize , this.elementFound.quantity);     
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

      console.log(product.selectedSize);
      
    }
        






 decrement(i,product) {
    
    console.log(product);
    console.log(i);
    
if (this.cartTab[i].cartCount == null ) {
        this.cartTab[i].cartCount=1
        this.cartTab[i].cartCount-=1

   if (product.selectedSize!=0) {
  let elementFound = product.sizesQuantity.find(element=>element.size == product.selectedSize)
  
        if (elementFound.quantity>= product.cartCount) {
           localStorage.setItem('cart',JSON.stringify(this.cartTab))
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
        console.log(this.cartTab[i].cartCount);
        
        if (product.seletedSize!=0) {
           this.elementFound = product.sizesQuantity.find(element=>element.size ==product.selectedSize)
          console.log(this.elementFound);
          console.log(product.sizesQuantity);
          
                if (this.elementFound.quantity>=  this.cartTab[i].cartCount) {
                   localStorage.setItem('cart',JSON.stringify(this.cartTab))
                   console.log(product.selectedSize , this.elementFound.quantity); 
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

      console.log(product.selectedSize);
      
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



  // public remove(product) {
  //   const index: number = this.appService.Data.cartList.indexOf(product);
  //   if (index !== -1) {
  //     this.appService.Data.cartList.splice(index, 1);
  //     this.grandTotal = this.grandTotal - this.total[product.id]; 
  //     this.appService.Data.totalPrice = this.grandTotal;       
  //     this.total.forEach(val => {
  //       if(val == this.total[product.id]){
  //         this.total[product.id] = 0;
  //       }
  //     });

  //     this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product.id]; 
  //     this.appService.Data.totalCartCount = this.cartItemCountTotal;
  //     this.cartItemCount.forEach(val=>{
  //       if(val == this.cartItemCount[product.id]){
  //         this.cartItemCount[product.id] = 0;
  //       }
  //     });
  //     this.appService.resetProductCartCount(product);
  //   }     
  // }

  clear(){
    // this.appService.Data.cartList.forEach(product=>{
    //   this.appService.resetProductCartCount(product);
    // });
    // this.appService.Data.cartList.length = 0;
    // this.appService.Data.totalPrice = 0;
    // this.appService.Data.totalCartCount = 0;
    localStorage.removeItem("cart");
    // localStorage.setItem("cart",JSON.stringify(this.cartTab))
    this.appService.shoppingCartSubject.next(this.cartTab)
    this.ngOnInit();
  } 
delete(i){
  
  
  this.cartTab.splice(i, 1);
  this.appService.shoppingCartSubject.next(this.cartTab)
  console.log(i);
  localStorage.setItem("cart",JSON.stringify(this.cartTab))
  
  console.log( this.appService.shoppingCartSubject.value);
  
}

  toCheckOut (){
     

    this.cartTab.forEach((element, i) => {
if (element.selectedSize!=0) {
  this.router.navigateByUrl('/checkout')}
else {
  this.messageQuantity=" Please select a size"
}
});



}




  }


