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
  userFound : any
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar ,public authService : AuthService) { }
  tokenPayload


  ngOnInit() {

    const token = JSON.parse(JSON.stringify(localStorage.getItem('token'))) 
    this.tokenPayload = decode(token);
    console.log(typeof(this.tokenPayload.userId));
const userId = this.tokenPayload.userId
console.log(userId);

this.authService.getUser('605b93132b7c322a10878e91').subscribe((res: any) => { this.userFound = res },
(erreur: any) => { },
() => {}
)

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




  public onInfoFormSubmit(userId,values:Object):void {
    if (this.infoForm.valid) {
      this.authService.updateUser(userId,values).subscribe((res:any)=>{console.log(res);
      })
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
