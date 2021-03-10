import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {MatDialog , MatDialogConfig} from '@angular/material/dialog';
import { DetailsContactComponent } from './details-contact/details-contact.component';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  ListContacts=[] as any;
 
  constructor( private ContactService: ContactService , public dialog: MatDialog) { }

  ngOnInit() {
    this.ContactService.getAllContacts().subscribe((res: any)=>{this.ListContacts=res},
(erreur:any)=>{},
()=>console.log(this.ListContacts));

  }
 
 
  openDialog(contact,id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(DetailsContactComponent, {data:contact ,width: '550px',height:'400px'});
    this.ContactService.messageViewed(id).subscribe((res)=>{},
    ()=>{
     
    }
    )
  
    
}

}
