import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import decode from 'jwt-decode';


@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  userFound
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar ,public authService : AuthService) { }
  tokenPayload
  ngOnInit() {

    const token = localStorage.getItem('token');
    this.tokenPayload = decode(token);
    console.log(this.tokenPayload);
this.authService.getUser(this.tokenPayload.userId).subscribe((res: any)=>{this.userFound=res;
console.log(res);
},
(erreur:any)=>{},
 ()=>
  {
    console.log("finished");
    console.log(this.userFound.name);
    
  } 

);
    
console.log(this.userFound);
    

    this.infoForm = this.formBuilder.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])]
    });

    this.passwordForm = this.formBuilder.group({
      'currentPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
