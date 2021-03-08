import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  ListContacts=[] as any;
  constructor( private contactsService: ContactService) { }

  ngOnInit() {
    this.contactsService.getAllContacts().subscribe((res: any)=>{this.ListContacts=res},
(erreur:any)=>{},
()=>console.log(this.ListContacts));

  }

}
