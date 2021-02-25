import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm:FormGroup;


  constructor() { }

  ngOnInit() {

    this.productForm = new FormGroup({
        productName : new FormControl('', Validators.required),
        gender : new FormControl('', Validators.required),
        categorie :new FormControl('', Validators.required),
        topProduct :new FormControl('', Validators.required),
        description :new FormControl('', Validators.required),
        price : new FormControl('', Validators.required),
        sale :new FormControl('', Validators.required),
        sizesQuantity: new FormArray([
          new FormGroup({
            size : new FormControl(),
            quantity : new FormControl()
          })

        ])
      });
  }

  ajouter(value){

console.log(value);


  }
  addSizeQuantity(){


    const sq = this.productForm.controls.sizesQuantity as FormArray
     sq.push(  new FormGroup({
      size : new FormControl(),
      quantity : new FormControl()
    }))
    
  }

  remove(i){
    const sq = this.productForm.controls.sizesQuantity as FormArray

    sq.removeAt(i)
  }








}
