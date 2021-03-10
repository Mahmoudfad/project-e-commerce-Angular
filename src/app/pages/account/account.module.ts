import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ContactsComponent } from './contacts/contacts.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import { DetailsContactComponent } from './contacts/details-contact/details-contact.component';


export const routes = [
  { 
      path: '', 
      component: AccountComponent, children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent, data: {  breadcrumb: 'Dashboard' } },
          { path: 'information', component: InformationComponent, data: {  breadcrumb: 'Information' } },
          { path: 'addresses', component: AddressesComponent, data: {  breadcrumb: 'Addresses' } },
          { path: 'orders', component: OrdersComponent, data: {  breadcrumb: 'Orders' } },
          { path: 'admin', component: AdminComponent, data: {  breadcrumb: 'admin' } },
          { path: 'addProduct', component: AddProductComponent, data: {  breadcrumb: 'addProduct' } },
          { path:'listProduct',component:ListProductComponent,data:{breadcrumb:'listProduct'} },
          { path:'contacts',component:ContactsComponent,data:{breadcrumb:'contacts'} },

      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxDropzoneModule,
    MatBadgeModule,
    MatDialogModule
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent,
    AdminComponent,
    AddProductComponent,
    UpdateProductComponent,
    ListProductComponent,
    ContactsComponent,
    DetailsContactComponent,
    
  ],
  exports:[
    DetailsContactComponent
  ],
  entryComponents: [DetailsContactComponent],
})
export class AccountModule { }
