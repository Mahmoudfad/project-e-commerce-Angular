import { getLocaleFirstDayOfWeek } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  ;
  clicked = false;
  // productUpdateForm: any;
  productId: any
  AllProducts: any
  productFound: any
  ListProducts = [] as any;
  files: File[] = [];
  sizeByProduct: any;
  quantityByProduct:any
  constructor(
    public http: AppService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public appService: AppService,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {
    this.productId = data._id
  }
  productUpdateForm: any = new FormGroup({

    productName: new FormControl(this.data.productName),
    gender: new FormControl(this.data.gender),
    categorie: new FormControl(this.data.categorie),
    topProduct: new FormControl(this.data.topProduct),
    description: new FormControl(this.data.description),
    price: new FormControl(this.data.price),
    // sale :new FormControl('', Validators.required),
    // productImage : new FormControl (),
    sizesQuantity: new FormArray([])
  });


  sq: any
  addSizeQuantity() {
    this.sq = this.productUpdateForm.controls.sizesQuantity as FormArray
    this.sq.push(new FormGroup({
      size: new FormControl(''),
      quantity: new FormControl('')
    }))
  }

  addSizeQuantityWithData(x) {
    this.sq = this.productUpdateForm.controls.sizesQuantity as FormArray
    this.sq.push(new FormGroup({
      size: new FormControl(x.size),
      quantity: new FormControl(Number(x.quantity))
    }))
  }

  ngOnInit(): void {
    console.log(this.data);
    this.data.sizesQuantity.forEach(x => {
      this.addSizeQuantityWithData(x);
      console.log(this.sizeByProduct);
    });
    
    // console.log(this.data.sizesQuantity);
    // this.clicked=true
    console.log("product id");

    console.log(this.productId);

    this.http.getProducts().subscribe((res: any) => { this.ListProducts = res },
      (erreur: any) => { },
      () => {
        this.ListProducts.forEach(element => {
          // console.log(element._id);
        });
      }
    );

    this.http.getSizeByProduct(this.productId).subscribe((res: any) => { this.sizeByProduct = res },
      (err: any) => { },
      () => {
        console.log(this.sizeByProduct);
      });


      this.http.getQuantityByProduct(this.productId).subscribe((res: any) => { this.quantityByProduct = res },
      (err: any) => { },
      () => {
        console.log(this.quantityByProduct);
      })
  }



  remove(i) {
    const sq = this.productUpdateForm.controls.sizesQuantity as FormArray
    sq.removeAt(i)
  }



  update() {
    

    var data = this.productUpdateForm.getRawValue()

  

    const formData: any = new FormData();



    formData.set('productName', this.productUpdateForm.get('productName').value);
    formData.set('gender', this.productUpdateForm.get('gender').value);
    formData.set('categorie', this.productUpdateForm.get('categorie').value);
    formData.set('topProduct', this.productUpdateForm.get('topProduct').value);
    formData.set('description', this.productUpdateForm.get('description').value);
    formData.set('price', this.productUpdateForm.get('price').value);
    formData.set('sizesQuantity', JSON.stringify(this.productUpdateForm.value.sizesQuantity));
    formData.set('size', this.sizeByProduct.value);
    formData.set('quantity', this.quantityByProduct.value);
    this.files.forEach(image => {
      formData.append('image', image);
    })
   
    
    this.appService.updateProduct(this.productId, formData).subscribe(
      (res: any) => res,
      (err: any) => { },
    )
  }
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event.addedFiles);
    this.files.splice(this.files.indexOf(event), 1);
  }
}


