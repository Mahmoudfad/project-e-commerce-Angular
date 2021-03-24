import { Component, OnInit, Input} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  ListMens=[] as any;
  ListWomens=[] as any;
  ListCategories=[] as any;
  constructor(private productService: ProductService) { }

  ngOnInit() { 
this.productService.getAllCategories().subscribe((res: any)=>{this.ListCategories=res},
(erreur:any)=>{},
()=>{}
);
  

//     this.productService.getMensProduct().subscribe((res: any)=>{this.ListMens=JSON.parse(JSON.stringify(res))},
// (erreur:any)=>{},
// ()=>{

  
// }
// );

// this.productService.getWomensProduct().subscribe((res: any)=>{this.ListWomens=res},
// (erreur:any)=>{},
// ()=>{}
// );

  }

  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }        
    });
  }

}
