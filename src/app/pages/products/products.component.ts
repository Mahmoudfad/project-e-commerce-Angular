import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from "../../app.models";
import { Settings, AppSettings } from 'src/app/app.settings';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen: boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count: any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort: any;
  public products = [] as any
  public categories: Category[];
  public brands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public colors = [
    { name: "#5C6BC0", selected: false },
    { name: "#66BB6A", selected: false },
    { name: "#EF5350", selected: false },
    { name: "#BA68C8", selected: false },
    { name: "#FF4081", selected: false },
    { name: "#9575CD", selected: false },
    { name: "#90CAF9", selected: false },
    { name: "#B2DFDB", selected: false },
    { name: "#DCE775", selected: false },
    { name: "#FFD740", selected: false },
    { name: "#00E676", selected: false },
    { name: "#FBC02D", selected: false },
    { name: "#FF7043", selected: false },
    { name: "#F5F5F5", selected: false },
    { name: "#696969", selected: false }
  ];
  public sizes = [
    { name: "S", selected: false },
    { name: "M", selected: false },
    { name: "L", selected: false },
    { name: "XL", selected: false },
    { name: "2XL", selected: false },
    { name: "32", selected: false },
    { name: "36", selected: false },
    { name: "38", selected: false },
    { name: "46", selected: false },
    { name: "52", selected: false },
    { name: "13.3\"", selected: false },
    { name: "15.4\"", selected: false },
    { name: "17\"", selected: false },
    { name: "21\"", selected: false },
    { name: "23.4\"", selected: false }
  ];
  public page: any;
  public settings: Settings;
  constructor(public appSettings: AppSettings,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    private ProductService: ProductService,
    public dialog: MatDialog,
    private router: Router) {
    this.settings = this.appSettings.settings;
  }

  baseURL = environment.baseURL
  categorie;
  gender;

  ngOnInit() {
    
    this.categorie = this.activatedRoute.snapshot.paramMap.get('categorie')
    this.appService.updatedCategorie(this.categorie);
    
    
    this.gender = this.activatedRoute.snapshot.paramMap.get('gender')
    this.appService.updatedGender(this.gender)
    
    this.getProductByCategory(this.appService.categorieSubject.value);

    if (this.gender && !this.categorie) {


      this.ProductService.getProductByGender(this.gender).subscribe((res: any) => { this.products = res },
        (erreur: any) => { },
        () => {
          console.log(this.products);
        });
    }
    else if (this.gender && this.categorie) {


      this.ProductService.getProductByGenderAndCategory(this.gender, this.categorie).subscribe((res: any) => { this.products = res },
        (erreur: any) => { },
        () => {
          console.log(this.products);
        });
    }
    else {
      this.getAllProducts();
    }


    // else {
    //   this.ProductService.getMensProduct().subscribe((res: any)=>{this.products=res},
    //   (erreur:any)=>{},
    //   ()=>{});
    // }

    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {
      //console.log(params['name']);
    });
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    };
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    };

    this.getCategories();
    this.getBrands();

  }
  public getProductByGender (gender){
    this.appService.getProductByGender(gender).subscribe(data => {
      this.products = data;
      // this.appService.categorieSubject.value = data;
      // this.appService.Data.categories = data;
    });
  }

  public getProductByCategory(category) {
    this.appService.getProductByCategory(category).subscribe(data => { 
      this.products = data;
      // this.appService.categorieSubject.value = data;
      // this.appService.Data.categories = data;
    });
    // this.appService.getCategorie().subscribe(data => {
    //   console.log(data);
    // });
    // this.appService.getGender().subscribe(data => {
    //   console.log(data);
    // });
  }

  public getProductByCategoryAndGender(gender,categorie){
    this.appService.getProductByCategoryAndGender(gender,categorie).subscribe(data => {
    
      
      this.products = data;
     
    });
  }


  public getAllProducts() {
    this.appService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);


      //for show more product  
      for (var index = 0; index < 3; index++) {
        this.products = this.products.concat(this.products);
      }
    });
  }

  public getCategories() {
    if (this.appService.Data.categories.length == 0) {
      this.appService.getCategories().subscribe(data => {
        this.categories = data;
        this.appService.Data.categories = data;
      });
    }
    else {
      this.categories = this.appService.Data.categories;
    }
  }

  public getBrands() {
    this.brands = this.appService.getBrands();
    this.brands.forEach(brand => { brand.selected = false });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count) {
    this.count = count;
    this.getAllProducts();
  }

  public changeSorting(sort) {
    this.sort = sort;
  }

  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog',
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

  public onPageChanged(event) {
    this.page = event;
    this.getAllProducts();
    window.scrollTo(0, 0);
  }

  public onChangeCategory(event) {
    if (event.target) {
     
      this.appService.genderSubject.next(event.target.innerText.toLowerCase())
      this.appService.categorieSubject.next(event.target.innerText.toLowerCase())
      this.getProductByGender(this.appService.genderSubject.value)
      this.getProductByCategory(this.appService.categorieSubject.value)

    }
  }

}
