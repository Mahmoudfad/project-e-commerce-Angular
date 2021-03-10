import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-details-contact',
  templateUrl: './details-contact.component.html',
  styleUrls: ['./details-contact.component.scss']
})
export class DetailsContactComponent implements OnInit {
  ListContacts=[] as any;
  dialogName: string;
  dialogMessage: string;
  constructor(private contactsService: ContactService ,
    public dialogRef: MatDialogRef<DetailsContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {

    
    this.contactsService.getAllContacts().subscribe((res: any)=>{this.ListContacts=res},
    (erreur:any)=>{},
    ()=>console.log());
    
  }

}
