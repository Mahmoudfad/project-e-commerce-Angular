import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { Data, AppService } from '../../app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper', { static: true }) horizontalStepper: MatStepper;
  @ViewChild('verticalStepper', { static: true }) verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
cartTab
baseURL= environment.baseURL



productToUpdate 
constructor(public appService:AppService, public formBuilder: FormBuilder , public productService : ProductService , private router : Router) { }

  ngOnInit() {
  
  

    this.cartTab= JSON.parse(localStorage.getItem('cart') || '[]')
    console.log(this.cartTab);
    this.productService.sharedDataComand
 
    
    
  
    

    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.cartCount*product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: '',
      company: '',
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: '',
      zip: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

productIdtab=[] as any
  indexQuantityToUpdate
  public placeOrder(){
    // this.horizontalStepper._steps.forEach(step => step.editable = false);
    // this.verticalStepper._steps.forEach(step => step.editable = false);
    // this.appService.Data.cartList.length = 0;    
    // this.appService.Data.totalPrice = 0;
    // this.appService.Data.totalCartCount = 0;
this.cartTab.forEach(element => {
  this.productService.getProductById(element._id).subscribe((res: any)=>{
    this.productToUpdate=res
    
    
  },
  (erreur:any)=>{},
   ()=>{ this.indexQuantityToUpdate = this.productToUpdate.sizesQuantity.findIndex(x=>x.size == element.selectedSize)
    
   this.productToUpdate.sizesQuantity[this.indexQuantityToUpdate].quantity= this.productToUpdate.sizesQuantity[this.indexQuantityToUpdate].quantity-element.cartCount
 
   this.productService.updateProductAfterComfirmation(element._id,this.productToUpdate).subscribe((res: any)=>{},
   (erreur:any)=>{},
   ()=>{

   
this.productIdtab.push(element._id)
  

    

   })


   })
})
let productt ={
  deliveryForm : this.deliveryForm.get("deliveryMethod").value,
  paymentForm : this.paymentForm.value,
  billingForm :  this.billingForm.value,
  productId : this.productIdtab
} 
console.log(this.productIdtab);

this.productService.postCmd(productt).subscribe((res=>{}))


}








}