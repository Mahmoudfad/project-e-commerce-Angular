import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() categories;
  @Input() categoryParentId;
  @Output() change: EventEmitter<any> = new EventEmitter();
  mainCategories;
  public products = [] as any
  categoriesWomen = [] as any
  ListCategories=[] as any;

  constructor(public appService: AppService,private router : Router ,private productService: ProductService) { }
  ngOnInit(): void {
   console.log("parent id");
   console.log(this.categoryParentId);
  //  this.categories=[]
  this.productService.getAllCategories().subscribe((res: any)=>{this.ListCategories=res},
(erreur:any)=>{},
()=>{}
);
  }
  navigation(gender,categorie){
    this.router.navigateByUrl('products/'+gender+'/'+categorie)
    
  }

  public ngDoCheck() {
    if(this.categories && !this.mainCategories) {
      console.log(this.categories);
      
      this.mainCategories = this.categories.filter(category => category.parentId == this.categoryParentId); 
    }
  }

  public stopClickPropagate(event: any){
    if(window.innerWidth < 960){
      event.stopPropagation();
      event.preventDefault();
    }    
  }
  // public getProductByGender (gender){
  //   this.appService.getProductByGender(gender).subscribe(data => {
  //     this.products = data;
  //     // this.appService.categorieSubject.value = data;
  //     // this.appService.Data.categories = data;
  //   });
  // }
  // public getProductByCategory(category) {
  //   this.appService.getProductByCategory(category).subscribe(data => { 
  //     this.products = data;
  //     // this.appService.categorieSubject.value = data;
  //     // this.appService.Data.categories = data;
  //   });
  //   // this.appService.getCategorie().subscribe(data => {
  //   //   console.log(data);
  //   // });
  //   // this.appService.getGender().subscribe(data => {
  //   //   console.log(data);
  //   // });
  // }

  public changeCategory(event){
    // this.appService.genderSubject.next(event.target.innerText.toLowerCase())
    // this.appService.categorieSubject.next(event.target.innerText.toLowerCase())
    // this.getProductByGender(this.appService.genderSubject.value)
    // this.getProductByCategory(this.appService.categorieSubject.value)
    
    this.change.emit(event);
  }

}