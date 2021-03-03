import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm:FormGroup;
  file;
  
  constructor(private productService: ProductService) { }
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
        categorie :new FormControl('', Validators.required),
        topProduct :new FormControl('', Validators.required),
        description :new FormControl('', Validators.required),
        price : new FormControl('', Validators.required),
        // sale :new FormControl('', Validators.required),
        // productImage : new FormControl (),
        sizesQuantity: new FormArray([
          new FormGroup({
            size : new FormControl(),
            quantity : new FormControl()
          }),
        ])
      });
  }


  addSizeQuantity(){
    const sq = this.productForm.controls.sizesQuantity as FormArray
     sq.push(  new FormGroup({
      size : new FormControl(),
      quantity : new FormControl()
    })) 
  }


  ajouter(){
    var data = this.productForm.getRawValue()

    console.log(data);
    
    const formData = new FormData();
  
    formData.set('productName', this.productForm.get('productName').value);
    formData.set('gender', this.productForm.get('gender').value);
    formData.set('categorie', this.productForm.get('categorie').value);
    formData.set('topProduct', this.productForm.get('topProduct').value);
    formData.set('description', this.productForm.get('description').value);
    formData.set('price', this.productForm.get('price').value);
    formData.set('sizesQuantity', this.productForm.get('sizesQuantity').value);
   this.files.forEach(image=>{
    formData.append('image', image);
   })
  
  
    this.productService.addProduct(formData).subscribe(res=>{
     
      
    },
    err=>{},
    ()=>{console.log("product created");
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