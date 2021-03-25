import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import decode from 'jwt-decode';
import{AuthService} from 'src/app/services/auth.service'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [
    { Name: 'Information', href :'information' , icon : 'info' }  ,
    { name: 'Add product', href: 'addProduct', icon: 'dashboard' },
    { name: 'All products', href: 'listProduct', icon: 'info'},
    { name: 'Contacts', href: 'contacts', icon: 'location_on',nbrNotif:0 },
    { name: 'Order History', href: 'orders', icon: 'add_shopping_cart'},  
    { name: 'Logout', href: '/sign-in', icon: 'power_settings_new'},    
  ];
  constructor(public router:Router , private AuthService:AuthService) { }
   tokenPayload : any
  ngOnInit() {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    const token = localStorage.getItem('token');
    this.tokenPayload = decode(token);
    console.log(this.tokenPayload.role);

  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
  }

}
