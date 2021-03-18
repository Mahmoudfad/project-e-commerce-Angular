import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ModalComponent} from 'src/app/pages/account/list-product/modal/modal.component'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})

export class ListProductComponent implements OnInit {
  ListProducts=[] as any;
  baseURL= environment.baseURL
  
  constructor(private  http:AppService,public dialog: MatDialog) { }
  
  
  
  ngOnInit():void {
    
    
this.http.getProducts().subscribe((res: any)=>{this.ListProducts=res},
(erreur:any)=>{},
 ()=>
  {
    this.ListProducts.forEach(element => {
    console.log(element._id);
    
    });
  } 

);

  }

  openDialog(product) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.afterAllClosed.subscribe(data=> this.ngOnInit() )
    
    // dialogConfig.data = {
    //   productId,
    // };

    this.dialog.open(ModalComponent,{data:product,width: '550px', height:'600px'});
  console.log(product._id);
  
  }


delete(productModel_id:any){
this.http.deleteProduct(productModel_id).subscribe(res=>console.log(res),(err)=>console.log(err),
()=> this.ngOnInit());

}
}
