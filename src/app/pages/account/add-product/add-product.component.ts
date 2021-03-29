import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { AccountModule } from 'src/app/pages/account/account.module'
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm:FormGroup;
  file;
  ListCategories=[] as any;
  ListGender=[] as any;
  constructor(private productService: ProductService,private router: Router) { }
files: File[] = [];

onSelect(event) {
  console.log(event);
  this.files.push(...event.addedFiles);
}

onRemove(event) {
  console.log(event.addedFiles);
  this.files.splice(this.files.indexOf(event), 1);
}
  ngOnInit() {

    this.productForm = new FormGroup({
      
        productName : new FormControl('', Validators.required),
        gender : new FormControl('', Validators.required),
        categorie :new FormControl(''),
        topProduct :new FormControl('', Validators.required),
        description :new FormControl('', Validators.required),
        price : new FormControl('', Validators.required),
        discount :new FormControl('', Validators.required),
        selectedSize:new FormControl(0, Validators.required),
        sizesQuantity: new FormArray([
          new FormGroup({
            size : new FormControl(),
            quantity : new FormControl()
          }),
        ])
      });
this.productService.getGenderByName(name).subscribe((res: any)=>{this.ListGender=res},
(erreur:any)=>{},
()=>{}
);

      this.productService.getAllCategories().subscribe((res: any)=>{this.ListCategories=res},
(erreur:any)=>{},
()=>{}
);
  }

sq : any
a = 0
  addSizeQuantity(){
     this.sq = this.productForm.controls.sizesQuantity as FormArray
     this.sq.push(  new FormGroup({
      size : new FormControl(),
      quantity : new FormControl()
    })) 

    console.log(this.productForm.get('sizesQuantity').value);
  }


  ajouter(){
    var data = this.productForm.getRawValue()

    console.log(data);
    
    const formData = new FormData();

    console.log(this.productForm.get('categorie').value);
    
  
    formData.set('productName', this.productForm.get('productName').value);
    formData.set('gender', this.productForm.get('gender').value);
    formData.set('categorie', this.productForm.get('categorie').value);
    formData.set('topProduct', this.productForm.get('topProduct').value);
    formData.set('description', this.productForm.get('description').value);
    formData.set('price', this.productForm.get('price').value);
    formData.set('discount', this.productForm.get('discount').value);
    formData.set('selectedSize', this.productForm.get('selectedSize').value);

    formData.set('sizesQuantity', JSON.stringify(this.productForm.get('sizesQuantity').value));
   this.files.forEach(image=>{
    formData.append('image', image);
   })
  
  
    this.productService.addProduct(formData).subscribe(res=>{
     
      
    },
    err=>{},
    ()=>{console.log("product created");
    this.productForm.reset()
    this.router.navigateByUrl('/account/listProduct');
    })
  
  }
  remove(i){
    const sq = this.productForm.controls.sizesQuantity as FormArray
    sq.removeAt(i)
  }
}






// url: any

//   onSelectFile(event) { // called each time file input changes
//     if (event.target.files && event.target.files[0]) {
//       var reader = new FileReader();

//       reader.readAsDataURL(event.target.files[0]); // read file as data url
//       reader.onload = (event) => { // called once readAsDataURL is completed
//         this.url =  reader.result;
        
//       }
//     }
// }