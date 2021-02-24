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
        this.router.navigate(['/']);
      })
    }
  }



  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe((res)=>{
        this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      })
      
    }
  }

}
