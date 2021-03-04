import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(public router:Router, public snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, emailValidator])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });

    this.registerForm = new FormGroup({
      name: new FormControl('',Validators.compose([Validators.required, Validators.minLength(3)]) ) ,
      email:new FormControl('',Validators.compose([Validators.required, emailValidator])),
      password: new FormControl('', Validators.required),
      confirmPassword :new FormControl('', Validators.required) 
    })
    // {validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res)=>{
       if(JSON.parse(JSON.stringify(res)).message=='Auth failed'){
        this.snackBar.open('verif pass or email', '×', { panelClass: 'warn', verticalPosition: 'top', duration: 3000 });
       
       }
       else{
        localStorage.setItem('connectedUser',JSON.stringify(res));
        this.router.navigateByUrl('/')
       }
        
      
      })
    }
   
  }



  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid && this.registerForm.controls.password.value==this.registerForm.controls.confirmPassword.value) {
      this.authService.register(this.registerForm.value).subscribe((res)=>{
        this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      })
      this.authService.registerMail(this.registerForm.controls.email.value).subscribe((res)=>{})
    }
    else {
      this.snackBar.open("Password and confirm password don't match!", '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
