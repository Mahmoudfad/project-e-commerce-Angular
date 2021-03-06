import { Component, OnInit} from '@angular/core';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import{ProductService} from 'src/app/services/product.service'

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  ListProducts=[] as any;
  constructor(private  http:AppService) { }

  ngOnInit():void {
this.http.getProducts().subscribe((res: any)=>{this.ListProducts=res},
(erreur:any)=>{},
()=>console.log(this.ListProducts));

  }
delete(Product_id){
  console.log(Product_id);
  
this.http.deleteProduct(Product_id).subscribe((r:any)=>{},err=>{},()=>{console.log(Product_id);
})
}
}
